import {
    Badge,
    Box,
    Center,
    Container,
    Flex,
    ListItem,
    OrderedList,
    Spacer,
    Text,
    Textarea,
    UnorderedList,
} from "@chakra-ui/react";
import Button from "../../components/Button";
import { BaseRoutes } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import {
    DossierDetailsDTO,
    DossierDetailsResponse,
    DossierReportDTO,
    DossierReportResponse,
    DossierStateEnum,
} from "../../models/dossier";
import { getDossierDetails, getDossierReport } from "../../services/dossier";
import { AllCourseSettings, componentMappings } from "../../models/course";
import { getAllCourseSettings } from "../../services/course";

export default function DossierReport() {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const { dossierId } = useParams();
    const [dossierReport, setDossierReport] = useState<DossierReportDTO | null>(null);
    const [allCourseSettings, setAllCourseSettings] = useState<AllCourseSettings>(null);

    useEffect(() => {
        requestDossierReport(dossierId);
        requestAllCareerSettings();
    }, [dossierId]);

    async function requestDossierReport(dossierId: string) {
        const dossierReportData: DossierReportResponse = await getDossierReport(dossierId);
        setDossierReport(dossierReportData.data);
    }

    async function requestAllCareerSettings() {
        const allCourseSettingsData: AllCourseSettings = (await getAllCourseSettings()).data;
        setAllCourseSettings(allCourseSettingsData);
    }

    return (
        <div>
            <Container maxW={"70%"} mt={5} mb={2}>
                <Button
                    style="primary"
                    variant="outline"
                    height="40px"
                    width="fit-content"
                    onClick={() => navigate(BaseRoutes.Home)}
                >
                    Return to Home
                </Button>

                <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginBottom="1">
                    {dossierReport?.title}
                </Text>

                <Container textAlign={"center"}>
                    {dossierReport?.state === DossierStateEnum.Approved && (
                        <Badge colorScheme="green" fontSize="md" variant={"solid"} marginBottom="2">
                            Approved
                        </Badge>
                    )}

                    {dossierReport?.state === DossierStateEnum.Rejected && (
                        <Badge colorScheme="red" fontSize="md" variant={"solid"} marginBottom="2">
                            Rejected
                        </Badge>
                    )}

                    {dossierReport?.state === DossierStateEnum.InReview && (
                        <Badge colorScheme="yellow" fontSize="md" variant={"solid"} marginBottom="2">
                            Under Review
                        </Badge>
                    )}

                    {dossierReport?.state === DossierStateEnum.Created && (
                        <Badge fontSize="md" variant={"solid"} marginBottom="2">
                            Created
                        </Badge>
                    )}
                </Container>

                <Text fontSize="xl" marginBottom="2" style={{ height: "100%" }}>
                    <b>Description of Dossier:</b>
                </Text>
                <Box p={"8px 16px"} mb={3} width={"100%"} backgroundColor={"gray.100"} borderRadius={"lg"}>
                    {dossierReport?.description}
                </Box>

                <Box fontSize="xl" marginBottom="2">
                    <b>Approval Stages:</b>{" "}
                    <OrderedList>
                        {dossierReport?.approvalStages
                            .sort((a, b) => (a.stageIndex - b.stageIndex > 0 ? 1 : -1))
                            .map((stage, index) => (
                                <ListItem ml={12} mb={4}>
                                    <Box key={index} fontSize="md">
                                        <Text>
                                            {" "}
                                            <b>{stage.group.name}</b> {stage.isCurrentStage ? "(Current Stage)" : ""}
                                        </Text>

                                        {stage.isFinalStage ? "Final Stage" : ""}
                                    </Box>
                                </ListItem>
                            ))}
                    </OrderedList>
                </Box>

                <Text fontSize="xl" as="b">
                    Course Creation Requests:
                </Text>

                <OrderedList ml={12} mt={2} mb={10}>
                    {dossierReport?.courseCreationRequests?.length === 0 && (
                        <Box backgroundColor={"brandRed600"} p={5} borderRadius={"xl"}>
                            <Text fontSize="md">No course creation requests.</Text>
                        </Box>
                    )}

                    {dossierReport?.courseCreationRequests?.map((courseCreationRequest, index) => (
                        <ListItem key={index} backgroundColor={"brandRed600"} p={5} borderRadius={"xl"}>
                            <div key={index}>
                                <Flex mb={6} gap={12} flexWrap={"wrap"}>
                                    <Box>
                                        <Text fontSize="md">
                                            <b>Course Career:</b>{" "}
                                            {allCourseSettings?.courseCareers.find(
                                                (career) => career.careerCode === courseCreationRequest.newCourse.career
                                            ).careerName ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md">
                                            <b>Course Subject:</b> {courseCreationRequest.newCourse.subject ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md">
                                            <b>Course Name:</b> {courseCreationRequest.newCourse.title ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md" marginBottom="1">
                                            <b>Course Code:</b> {courseCreationRequest.newCourse.catalog ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md">
                                            <b>Credits:</b> {courseCreationRequest.newCourse.creditValue ?? "N/A"}
                                        </Text>
                                    </Box>
                                    <Spacer />
                                    <Spacer />
                                    <Box>
                                        <Text fontSize="md" marginBottom="1">
                                            <b>Component(s):</b>{" "}
                                            {allCourseSettings?.courseComponents
                                                .filter((component) =>
                                                    Object.keys(
                                                        courseCreationRequest?.newCourse.componentCodes || {}
                                                    ).includes(componentMappings[component.componentName])
                                                )
                                                .map((filteredComponent) => {
                                                    const code = componentMappings[filteredComponent.componentName];
                                                    const hours = courseCreationRequest.newCourse.componentCodes[code];
                                                    return `${filteredComponent.componentName} ${hours} hour(s) per week`;
                                                })
                                                .join(", ")}
                                        </Text>

                                        <Text fontSize="md" marginBottom="1">
                                            <b>Equivalent Courses:</b>{" "}
                                            {courseCreationRequest.newCourse.equivalentCourses ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md" marginBottom="3">
                                            <b>Prerequisites or Corequisites:</b>{" "}
                                            {courseCreationRequest.newCourse.preReqs == ""
                                                ? "N/A"
                                                : courseCreationRequest.newCourse.preReqs}
                                        </Text>
                                    </Box>
                                </Flex>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Course Description:</b> <br />{" "}
                                    {courseCreationRequest.newCourse.description ?? "N/A"}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Rationale:</b> <br />
                                    {courseCreationRequest.newCourse.rationale ?? "N/A"}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b> Ressource Implications:</b> <br />
                                    {courseCreationRequest.newCourse.resourceImplication ?? "N/A"}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Comments:</b> <br />
                                    {courseCreationRequest.comment == "" ? "N/A" : courseCreationRequest.comment}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Conflicts:</b> <br />
                                    {courseCreationRequest.conflict == "" ? "N/A" : courseCreationRequest.comment}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Notes:</b> <br />
                                    {courseCreationRequest.newCourse.courseNotes == ""
                                        ? "N/A"
                                        : courseCreationRequest.newCourse.courseNotes}
                                </Text>
                            </div>
                        </ListItem>
                    ))}
                </OrderedList>

                <Text fontSize="xl" as="b">
                    Course Deletion Requests:
                </Text>

                <OrderedList ml={12} mt={2}>
                    {dossierReport?.courseDeletionRequests?.length === 0 && (
                        <Box backgroundColor={"brandGray200"} p={5} borderRadius={"xl"}>
                            <Text fontSize="md">No course deletion requests.</Text>
                        </Box>
                    )}

                    {dossierReport?.courseDeletionRequests.map((courseCreationRequest, index) => (
                        <ListItem key={index} backgroundColor={"brandGray200"} p={5} borderRadius={"xl"}>
                            <div key={index}>
                                <Flex mb={6} gap={12} flexWrap={"wrap"}>
                                    <Box>
                                        <Text fontSize="md">
                                            <b>Course Career:</b>{" "}
                                            {allCourseSettings?.courseCareers.find(
                                                (career) => career.careerCode === courseCreationRequest.course.career
                                            ).careerName ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md">
                                            <b>Course Subject:</b> {courseCreationRequest.course.subject ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md">
                                            <b>Course Name:</b> {courseCreationRequest.course.title ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md" marginBottom="1">
                                            <b>Course Code:</b> {courseCreationRequest.course.catalog ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md">
                                            <b>Credits:</b> {courseCreationRequest.course.creditValue ?? "N/A"}
                                        </Text>
                                    </Box>
                                    <Spacer />
                                    <Spacer />
                                    <Box>
                                        <Text fontSize="md" marginBottom="1">
                                            <b>Component(s):</b>{" "}
                                            {allCourseSettings?.courseComponents
                                                .filter((component) =>
                                                    Object.keys(
                                                        courseCreationRequest?.course.componentCodes || {}
                                                    ).includes(componentMappings[component.componentName])
                                                )
                                                .map((filteredComponent) => {
                                                    const code = componentMappings[filteredComponent.componentName];
                                                    const hours = courseCreationRequest.course.componentCodes[code];
                                                    return `${filteredComponent.componentName} ${hours} hour(s) per week`;
                                                })
                                                .join(", ")}
                                        </Text>

                                        <Text fontSize="md" marginBottom="1">
                                            <b>Equivalent Courses:</b>{" "}
                                            {courseCreationRequest.course.equivalentCourses ?? "N/A"}
                                        </Text>

                                        <Text fontSize="md" marginBottom="3">
                                            <b>Prerequisites or Corequisites:</b>{" "}
                                            {courseCreationRequest.course.preReqs == ""
                                                ? "N/A"
                                                : courseCreationRequest.course.preReqs}
                                        </Text>
                                    </Box>
                                </Flex>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Course Description:</b> <br />{" "}
                                    {courseCreationRequest.course.description ?? "N/A"}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Rationale:</b> <br />
                                    {courseCreationRequest.course.rationale ?? "N/A"}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b> Ressource Implications:</b> <br />
                                    {courseCreationRequest.course.resourceImplication ?? "N/A"}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Comments:</b> <br />
                                    {courseCreationRequest.comment == "" ? "N/A" : courseCreationRequest.comment}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Conflicts:</b> <br />
                                    {courseCreationRequest.conflict == "" ? "N/A" : courseCreationRequest.comment}
                                </Text>

                                <Text fontSize="md" marginBottom="3">
                                    <b>Notes:</b> <br />
                                    {courseCreationRequest.course.courseNotes == ""
                                        ? "N/A"
                                        : courseCreationRequest.course.courseNotes}
                                </Text>
                            </div>
                        </ListItem>
                    ))}
                </OrderedList>
            </Container>
        </div>
    );
}
