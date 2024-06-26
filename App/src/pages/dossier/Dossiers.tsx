import {
    Text,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    Flex,
    Box,
    Tooltip,
    useToast,
} from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { deleteDossierById, getMyDossiers } from "../../services/dossier";
import DossierModal from "./DossierModal";
import React from "react";
import Button from "../../components/Button";
import { UserRoles } from "../../models/user";
import { showToast } from "../../utils/toastUtils";
import { DossierDTO, DossierStateEnum, GetMyDossiersResponse } from "../../models/dossier";
import { BaseRoutes } from "../../constants";
import { useNavigate } from "react-router-dom";
import DossierTable from "../../components/DossierTable";

export default function Dossiers() {
    const user = useContext(UserContext);
    const toast = useToast(); // Use the useToast hook
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const [myCreatedDossiers, setMyCreatedDossiers] = useState<DossierDTO[]>([]);
    const [myUnderReviewDossiers, setMyUnderReviewDossiers] = useState<DossierDTO[]>([]);
    const [myApprovedDossiers, setMyApprovedDossiers] = useState<DossierDTO[]>([]);
    const [myRejectedDossiers, setMyRejectedDossiers] = useState<DossierDTO[]>([]);
    const [showDossierModal, setShowDossierModal] = useState<boolean>(false);
    const [selectedDossier, setSelectedDossier] = useState<DossierDTO | null>(null);
    const [dossierModalAction, setDossierModalTitle] = useState<"add" | "edit">();
    const [loading, setLoading] = useState<boolean>(false);

    // pagination for Created
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const resultsPerPage = 5;
    // const totalResults = myCreatedDossiers.length;
    // const startIndex = myCreatedDossiers.length === 0 ? 0 : (currentPage - 1) * resultsPerPage + 1;
    // const endIndex = Math.min(currentPage * resultsPerPage, totalResults);

    const cancelRef = React.useRef();

    useEffect(() => {
        getAllDossiers();
        console.log(user);
    }, []);

    function getAllDossiers() {
        getMyDossiers()
            .then(
                (res: GetMyDossiersResponse) => {
                    setMyCreatedDossiers(res.data.filter((dossier) => dossier.state === DossierStateEnum.Created));
                    setMyUnderReviewDossiers(res.data.filter((dossier) => dossier.state === DossierStateEnum.InReview));
                    setMyApprovedDossiers(res.data.filter((dossier) => dossier.state === DossierStateEnum.Approved));
                    setMyRejectedDossiers(res.data.filter((dossier) => dossier.state === DossierStateEnum.Rejected));
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    // endpoint not implemented yet
    function deleteDossier(dossier: DossierDTO) {
        setLoading(true);
        console.log(dossier);
        deleteDossierById(dossier.id).then(
            () => {
                myCreatedDossiers.splice(myCreatedDossiers.indexOf(dossier), 1);
                showToast(toast, "Success!", "Dossier deleted.", "success");
                setLoading(false);
                onClose();
            },
            () => {
                showToast(toast, "Error!", "Dossier not deleted.", "error");
                setLoading(false);
                onClose();
            }
        );
    }

    function displayDossierModal() {
        setShowDossierModal(true);
    }

    function closeDossierModal() {
        setShowDossierModal(false);
    }

    function deleteAlertDialog() {
        return (
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Dossier
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete <b>{selectedDossier?.title}</b>? You can&apos;t undo this
                            action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                style="secondary"
                                variant="outline"
                                width="fit-content"
                                height="40px"
                                ref={cancelRef}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                style="primary"
                                variant="solid"
                                width="fit-content"
                                height="40px"
                                isLoading={loading}
                                loadingText="Deleting"
                                onClick={() => {
                                    deleteDossier(selectedDossier);
                                    // onClose();
                                }}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        );
    }

    function handleNavigateToDossierDetails(dossierId: string) {
        navigate(BaseRoutes.DossierDetails.replace(":dossierId", dossierId));
    }

    function handleNavigateToDossierReport(dossierId: string) {
        navigate(BaseRoutes.DossierReport.replace(":dossierId", dossierId));
    }

    function handleNavigateToDossierReview(dossierId: string) {
        navigate(BaseRoutes.DossierReview.replace(":dossierId", dossierId));
    }

    return (
        <div>
            <Container maxW={"5xl"} mt={5} pl={0}>
                <Button
                    style="primary"
                    variant="outline"
                    height="40px"
                    width="fit-content"
                    onClick={() => navigate(BaseRoutes.Home)}
                >
                    Return to Home
                </Button>
                <Button
                    style="primary"
                    variant="outline"
                    width="fit-content"
                    height="40px"
                    alignSelf="flex-end"
                    ml="2"
                    isDisabled={!user.roles.includes(UserRoles.Initiator)}
                    onClick={() => {
                        navigate(BaseRoutes.DossiersToReview);
                    }}
                >
                    Dossiers To Review
                </Button>
                <Button
                    style="primary"
                    variant="outline"
                    height="40px"
                    width="fit-content"
                    ml="2"
                    onClick={() => navigate(BaseRoutes.DossierBrowser)}
                >
                    Dossier Browser
                </Button>
            </Container>
            <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                {user?.firstName + "'s"} Dossiers
            </Text>

            <Box maxW="5xl" m="auto">
                <Flex flexDirection="column">
                    <div style={{ margin: "5px" }}>
                        <DossierTable
                            myDossiers={myCreatedDossiers}
                            onOpen={onOpen}
                            setDossierModalTitle={setDossierModalTitle}
                            setSelectedDossier={setSelectedDossier}
                            displayDossierModal={displayDossierModal}
                            handleNavigateToDossierDetails={handleNavigateToDossierDetails}
                            handleNavigateToDossierReport={handleNavigateToDossierReport}
                            useIcons={true}
                            reviewIcons={false}
                        />
                    </div>
                    <Tooltip
                        label="Only Initiators can create dossiers"
                        isDisabled={user.roles.includes(UserRoles.Initiator)}
                    >
                        <span style={{ alignSelf: "flex-end", width: "fit-content", height: "fit-content" }}>
                            <Button
                                leftIcon={<AddIcon />}
                                style="primary"
                                variant="solid"
                                width="100px"
                                height="40px"
                                mt="2"
                                alignSelf="flex-end"
                                isDisabled={!user.roles.includes(UserRoles.Initiator)}
                                onClick={() => {
                                    setSelectedDossier(null);
                                    setDossierModalTitle("add");
                                    displayDossierModal();
                                }}
                            >
                                Add
                            </Button>
                        </span>
                    </Tooltip>

                    <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                        {user?.firstName + "'s"} Dossiers Under Review
                    </Text>
                    <div style={{ margin: "5px" }}>
                        <DossierTable
                            myDossiers={myUnderReviewDossiers}
                            onOpen={onOpen}
                            setDossierModalTitle={setDossierModalTitle}
                            setSelectedDossier={setSelectedDossier}
                            displayDossierModal={displayDossierModal}
                            handleNavigateToDossierDetails={handleNavigateToDossierDetails}
                            handleNavigateToDossierReport={handleNavigateToDossierReport}
                            handleNavigateToDossierReview={handleNavigateToDossierReview}
                            useIcons={false}
                            reviewIcons={true}
                        />
                    </div>
                    <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                        {user?.firstName + "'s"} Approved Dossiers
                    </Text>

                    <DossierTable
                        myDossiers={myApprovedDossiers}
                        onOpen={onOpen}
                        setDossierModalTitle={setDossierModalTitle}
                        setSelectedDossier={setSelectedDossier}
                        displayDossierModal={displayDossierModal}
                        handleNavigateToDossierDetails={handleNavigateToDossierDetails}
                        handleNavigateToDossierReport={handleNavigateToDossierReport}
                        handleNavigateToDossierReview={handleNavigateToDossierReview}
                        useIcons={false}
                        reviewIcons={true}
                    />

                    <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                        {user?.firstName + "'s"} Rejected Dossiers
                    </Text>
                    <div style={{ margin: "5px" }}>
                        <DossierTable
                            myDossiers={myRejectedDossiers}
                            onOpen={onOpen}
                            setDossierModalTitle={setDossierModalTitle}
                            setSelectedDossier={setSelectedDossier}
                            displayDossierModal={displayDossierModal}
                            handleNavigateToDossierDetails={handleNavigateToDossierDetails}
                            handleNavigateToDossierReport={handleNavigateToDossierReport}
                            handleNavigateToDossierReview={handleNavigateToDossierReview}
                            useIcons={false}
                            reviewIcons={true}
                        />
                    </div>
                </Flex>
            </Box>

            {deleteAlertDialog()}
            {/* this is the Dossier Modal */}
            {showDossierModal && (
                <DossierModal
                    action={dossierModalAction}
                    dossier={selectedDossier}
                    dossierList={myCreatedDossiers}
                    open={showDossierModal}
                    closeModal={closeDossierModal}
                />
            )}
        </div>
    );
}
