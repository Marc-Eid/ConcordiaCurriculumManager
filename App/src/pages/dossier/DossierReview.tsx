import { useContext, useEffect, useRef, useState } from "react";
import {
    ApprovalStage,
    DossierDetailsDTO,
    DossierDetailsResponse,
    dossierStateToString,
    DossierDiscussionMessage,
    DiscussionMessageVoteEnum,
} from "../../models/dossier";
import { getDossierDetails } from "../../services/dossier";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Card,
    CardBody,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Icon,
    Kbd,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import Button from "../../components/Button";
import { BaseRoutes } from "../../constants";
import {
    AddIcon,
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowUpIcon,
    CloseIcon,
    CopyIcon,
    DeleteIcon,
    EditIcon,
} from "@chakra-ui/icons";
import React from "react";
import {
    deleteReviewMessage,
    editReviewMessage,
    forwardDossier,
    rejectDossier,
    returnDossier,
    reviewDossier,
    voteDossierMessage,
} from "../../services/dossierreview";
import { showToast } from "../../utils/toastUtils";
import { UserContext } from "../../App";
import { UserRoles } from "../../models/user";
import DossierHistoryModal from "./DossierHistoryModal";
import { SignalRManager } from "../../utils/SignalRManager";

export default function DossierReview() {
    const { dossierId } = useParams();
    const [dossierDetails, setDossierDetails] = useState<DossierDetailsDTO | null>(null);
    const { isOpen: isOpenMessage, onOpen: onOpenMessage, onClose: onCloseMessage } = useDisclosure();
    const { isOpen: isOpenForward, onOpen: onOpenForward, onClose: onCloseForward } = useDisclosure();
    const { isOpen: isOpenReturn, onOpen: onOpenReturn, onClose: onCloseReturn } = useDisclosure();
    const { isOpen: isOpenReject, onOpen: onOpenReject, onClose: onCloseReject } = useDisclosure();
    const cancelRef = React.useRef();
    const toast = useToast();
    const [message, setMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [messageError, setMessageError] = useState(true);
    const [currentGroup, setCurrentGroup] = useState<ApprovalStage | null>(null);
    const [isGroupMaster, setIsGroupMaster] = useState(false);
    const [isPartOfCurrentStageGroup, setIsPartOfCurrentStageGroup] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
    const signalRConnectionRef = useRef<SignalRManager | null>(null);
    const user = useContext(UserContext);

    const navigate = useNavigate();
    const useWebSocket = true;

    useEffect(() => {
        requestDossierDetails(dossierId);

        if (useWebSocket) {
            const connection = new SignalRManager(dossierId, {
                handleMessageReceived: handleWebSocketMessageReceived,
                handleError: (error: string) => {
                    showToast(toast, "Error!", error, "error");
                },
            });

            connection.startConnection();
            signalRConnectionRef.current = connection;
        }

        return () => {
            if (useWebSocket) {
                signalRConnectionRef.current?.endConnection();
            }
        };
    }, [dossierId]);

    async function requestDossierDetails(dossierId: string) {
        const dossierDetailsData: DossierDetailsResponse = await getDossierDetails(dossierId);
        setDossierDetails(dossierDetailsData.data);
        const currentStageGroup = dossierDetailsData.data.approvalStages.filter((stage) => stage.isCurrentStage)[0];
        setCurrentGroup(currentStageGroup);
        setIsGroupMaster(user.masteredGroups?.includes(currentStageGroup?.groupId));
        setIsPartOfCurrentStageGroup(user.groups?.includes(currentStageGroup?.groupId));
    }

    function messageAlertDialog() {
        return (
            <AlertDialog isOpen={isOpenMessage} leastDestructiveRef={cancelRef} onClose={onCloseMessage}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Add Message
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to submit this message to the discussion board? You can&apos;t undo
                            this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                style="secondary"
                                variant="outline"
                                width="fit-content"
                                height="40px"
                                ref={cancelRef}
                                onClick={onCloseMessage}
                            >
                                Cancel
                            </Button>
                            <Button
                                style="primary"
                                variant="solid"
                                width="fit-content"
                                height="40px"
                                onClick={() => {
                                    handleSubmitRequest();
                                    onCloseMessage();
                                    setMessage("");
                                }}
                                ml={3}
                            >
                                Submit
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        );
    }

    function forwardAlertDialog() {
        return (
            <AlertDialog isOpen={isOpenForward} leastDestructiveRef={cancelRef} onClose={onCloseForward}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {currentGroup?.isFinalStage ? "Accept Dossier" : "Forward Dossier"}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {currentGroup?.isFinalStage
                                ? "Are you sure you want to accept this dossier? "
                                : "Are you sure you want to forward this dossier to the next group in the approval pipeline? "}
                            You can&apos;t undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                style="secondary"
                                variant="outline"
                                width="fit-content"
                                height="40px"
                                ref={cancelRef}
                                onClick={onCloseForward}
                            >
                                Cancel
                            </Button>
                            <Button
                                style="primary"
                                variant="solid"
                                width="fit-content"
                                height="40px"
                                onClick={() => {
                                    handleForwardDossier();
                                    navigate(BaseRoutes.DossiersToReview);
                                }}
                                ml={3}
                            >
                                {currentGroup?.isFinalStage ? "Accept" : "Forward"}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        );
    }

    function returnAlertDialog() {
        return (
            <AlertDialog isOpen={isOpenReturn} leastDestructiveRef={cancelRef} onClose={onCloseReturn}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Return Dossier
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to return this dossier to the previous group in the approval pipeline?
                            You can&apos;t undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                style="secondary"
                                variant="outline"
                                width="fit-content"
                                height="40px"
                                ref={cancelRef}
                                onClick={onCloseReturn}
                            >
                                Cancel
                            </Button>
                            <Button
                                style="primary"
                                variant="solid"
                                width="fit-content"
                                height="40px"
                                onClick={() => {
                                    handleReturnDossier();
                                    navigate(BaseRoutes.DossiersToReview);
                                }}
                                ml={3}
                            >
                                Return
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        );
    }

    function rejectAlertDialog() {
        return (
            <AlertDialog isOpen={isOpenReject} leastDestructiveRef={cancelRef} onClose={onCloseReject}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Reject Dossier
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to reject this dossier? You can&apos;t undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                style="secondary"
                                variant="outline"
                                width="fit-content"
                                height="40px"
                                ref={cancelRef}
                                onClick={onCloseReject}
                            >
                                Cancel
                            </Button>
                            <Button
                                style="primary"
                                variant="solid"
                                width="fit-content"
                                height="40px"
                                onClick={() => {
                                    handleRejectDossier();
                                    navigate(BaseRoutes.DossiersToReview);
                                }}
                                ml={3}
                            >
                                Reject
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        );
    }

    const handleForwardDossier = () => {
        forwardDossier(dossierId)
            .then(() => {
                if (currentGroup?.isFinalStage) {
                    showToast(toast, "Success!", "Dossier successfully accepted.", "success");
                } else {
                    showToast(toast, "Success!", "Dossier successfully forwarded.", "success");
                }
            })
            .catch(() => {
                showToast(toast, "Error!", "One or more validation errors occurred", "error");
            });
    };

    const handleReturnDossier = () => {
        returnDossier(dossierId)
            .then(() => {
                showToast(toast, "Success!", "Dossier successfully returned.", "success");
            })
            .catch(() => {
                showToast(toast, "Error!", "One or more validation errors occurred", "error");
            });
    };

    const handleRejectDossier = () => {
        rejectDossier(dossierId)
            .then(() => {
                showToast(toast, "Success!", "Dossier successfully rejected.", "success");
            })
            .catch(() => {
                showToast(toast, "Error!", "One or more validation errors occurred", "error");
            });
    };

    const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value.length === 0) setMessageError(true);
        else setMessageError(false);
        setMessage(e.currentTarget.value);
    };

    const handleDeleteReviewMessage = (messageId: string) => {
        deleteReviewMessage(dossierId, messageId)
            .then(() => {
                showToast(toast, "Success!", "Message successfully deleted.", "success");
                requestDossierDetails(dossierId);
            })
            .catch(() => {
                showToast(toast, "Error!", "One or more validation errors occurred", "error");
            });
    };

    const handleSubmitRequest = () => {
        setFormSubmitted(true);
        if (messageError) return;
        else {
            const dossierForReviewDTO = {
                message: message,
                groupId: currentGroup?.groupId,
            };

            if (useWebSocket) {
                signalRConnectionRef.current?.sendMessage(dossierForReviewDTO);
            } else {
                reviewDossier(dossierId, dossierForReviewDTO)
                    .then(() => {
                        showToast(toast, "Success!", "Message successfully sent.", "success");
                        requestDossierDetails(dossierId);
                    })
                    .catch((e) => {
                        if (e.response.status == 403) {
                            showToast(
                                toast,
                                "Error!",
                                "You need to be part of the current stage group in order to submit a message.",
                                "error"
                            );
                        } else {
                            showToast(toast, "Error!", "One or more validation errors occurred", "error");
                        }
                    });
            }
        }
    };

    const handleReplyRequest = (replyMessage, messageId) => {
        const dossierForReviewDTO = {
            message: replyMessage,
            groupId: currentGroup?.groupId,
            parentDiscussionMessageId: messageId,
        };

        if (useWebSocket) {
            signalRConnectionRef.current?.sendMessage(dossierForReviewDTO);
        } else {
            reviewDossier(dossierId, dossierForReviewDTO)
                .then(() => {
                    showToast(toast, "Success!", "Reply successfully sent.", "success");
                    requestDossierDetails(dossierId);
                })
                .catch((e) => {
                    if (e.response.status == 403) {
                        showToast(
                            toast,
                            "Error!",
                            "You need to be part of the current stage group to reply to the message.",
                            "error"
                        );
                    } else {
                        showToast(toast, "Error!", "One or more validation errors occurred", "error");
                    }
                });
        }
    };

    const handleEditRequest = (newMessage, messageId) => {
        const editReviewMessageDTO = {
            discussionMessageId: messageId,
            newMessage: newMessage,
        };
        editReviewMessage(dossierId, editReviewMessageDTO)
            .then(() => {
                showToast(toast, "Success!", "Edit message was successful.", "success");
                requestDossierDetails(dossierId);
            })
            .catch((e) => {
                if (e.response.status == 403) {
                    showToast(toast, "Error!", "You cannot edit the message at this state.", "error");
                } else {
                    showToast(toast, "Error!", "One or more validation errors occurred", "error");
                }
            });
    };

    const handleWebSocketMessageReceived = (messageDossierId: string, message: DossierDiscussionMessage) => {
        if (messageDossierId != dossierId) {
            return;
        }

        setDossierDetails((prevDetails) => ({
            ...prevDetails,
            discussion: {
                ...prevDetails.discussion,
                messages: [...prevDetails.discussion.messages, message],
            },
        }));
    };

    const handleVoteRequest = (messageId: string, voteValue: DiscussionMessageVoteEnum) => {
        const voteReviewMessageDTO = {
            discussionMessageId: messageId,
            value: voteValue,
        };
        voteDossierMessage(dossierId, voteReviewMessageDTO)
            .then(() => {
                showToast(toast, "Success!", "Vote was registered successfully.", "success");
                requestDossierDetails(dossierId);
            })
            .catch((e) => {
                if (e.response.status == 403) {
                    showToast(toast, "Error!", "You cannot vote for any message at this state.", "error");
                } else {
                    showToast(toast, "Error!", "One or more validation errors occurred", "error");
                }
            });
    };

    const Message = ({
        message,
        messages,
        group,
        depth,
    }: {
        message: DossierDiscussionMessage;
        messages: DossierDiscussionMessage[];
        group: ApprovalStage;
        depth: number;
    }) => {
        const marginLeft = `${depth * 20}px`;
        const colorDepth = `gray.${Math.min(depth * 100 + 100, 500)}`;

        const [showReplyInput, setShowReplyInput] = useState(false);
        const [replyText, setReplyText] = useState("");
        const [replyError, setReplyError] = useState(true);
        const [replySubmitted, setReplySubmitted] = useState(false);

        const [showEditInput, setShowEditInput] = useState(false);
        const [editText, setEditText] = useState("");
        const [editError, setEditError] = useState(true);
        const [editSubmitted, setEditSubmitted] = useState(false);

        const [showReplies, setShowReplies] = useState<boolean>(() => {
            const storedMessageState = localStorage.getItem(message.id);
            return storedMessageState ? JSON.parse(storedMessageState) : false;
        });

        const [messageUpvoted, setMessageUpvoted] = useState(false);
        const [messageDownvoted, setMessageDownvoted] = useState(false);

        useEffect(() => {
            const vote = message.discussionMessageVotes.find((vote) => vote.userId === user.id);

            if (vote) {
                const voteValue = vote.discussionMessageVoteValue;

                if (voteValue.valueOf() === DiscussionMessageVoteEnum.Upvote) {
                    setMessageUpvoted(true);
                } else {
                    setMessageDownvoted(true);
                }
            }
        }, []);

        const {
            isOpen: isOpenDeleteMessage,
            onOpen: onOpenDeleteMessage,
            onClose: onCloseDeleteMessage,
        } = useDisclosure();

        const toggleReplies = () => {
            const newMessageState = !showReplies;
            setShowReplies(newMessageState);
            localStorage.setItem(message.id, JSON.stringify(newMessageState));
        };

        const handleToggleReply = () => {
            setShowReplyInput(!showReplyInput);
            if (!showReplyInput) {
                setReplyText("");
            }
        };

        const handleToggleEdit = (message) => {
            setEditText(message);
            setShowEditInput(!showEditInput);
        };

        const handleChangeReply = (e) => {
            if (e.currentTarget.value.length === 0 || e.currentTarget.value.trim() === "") setReplyError(true);
            else setReplyError(false);
            setReplyText(e.currentTarget.value);
        };

        const handleChangeEdit = (e) => {
            if (e.currentTarget.value.length === 0 || e.currentTarget.value.trim() === "") setEditError(true);
            else setEditError(false);
            setEditText(e.currentTarget.value);
        };

        const handleSubmitReply = () => {
            setReplySubmitted(true);
            if (replyError) {
                showToast(toast, "Error!", "Your reply cannot be an empty message.", "error");
            } else {
                handleReplyRequest(replyText, message.id);
                setReplyText("");
                setShowReplyInput(false);
                setReplyError(false);
            }
        };

        const handleSubmitEdit = () => {
            setEditSubmitted(true);
            if (editError) {
                showToast(toast, "Error!", "Your edit message cannot be empty.", "error");
            } else {
                handleEditRequest(editText, message.id);
                setEditText("");
                setShowEditInput(false);
                setEditError(false);
            }
        };

        function deleteMessageAlertDialog(messageId: string) {
            return (
                <AlertDialog
                    isOpen={isOpenDeleteMessage}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseDeleteMessage}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete Review Message
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure you want to delete this message? You can&apos;t undo this action
                                afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button
                                    style="secondary"
                                    variant="outline"
                                    width="fit-content"
                                    height="40px"
                                    ref={cancelRef}
                                    onClick={onCloseDeleteMessage}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    style="primary"
                                    variant="solid"
                                    width="fit-content"
                                    height="40px"
                                    onClick={() => {
                                        handleDeleteReviewMessage(messageId);
                                        onCloseDeleteMessage();
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

        const handleUpvote = () => {
            const voteValue = messageUpvoted ? DiscussionMessageVoteEnum.NoVote : DiscussionMessageVoteEnum.Upvote;
            handleVoteRequest(message.id, voteValue);
        };

        const handleDownvote = () => {
            const voteValue = messageDownvoted ? DiscussionMessageVoteEnum.NoVote : DiscussionMessageVoteEnum.Downvote;
            handleVoteRequest(message.id, voteValue);
        };

        return (
            <div style={{ marginLeft: marginLeft }}>
                <CardBody key={group.groupId}>
                    <Box bg={colorDepth} p={2}>
                        <Text fontWeight="bold">
                            {message.author.firstName} {message.author.lastName}
                            <br />
                            {group.group.name}
                        </Text>
                        <Text>
                            {message.createdDate.toString().substring(0, 10)}{" "}
                            {new Date(message.createdDate).getHours().toString()}:
                            {new Date(message.createdDate).getMinutes().toString()}:
                            {new Date(message.createdDate).getSeconds().toString()}
                        </Text>
                        <Text mt={2}>{message.message}</Text>

                        <Flex alignItems="center">
                            <Button
                                onClick={handleUpvote}
                                marginTop={2}
                                backgroundColor={messageUpvoted ? "orange.200" : ""}
                            >
                                <ArrowUpIcon />
                            </Button>
                            <Text as="span" fontWeight="bold" marginTop={2} marginRight={4} marginLeft={4}>
                                {message.voteCount}
                            </Text>
                            <Button
                                onClick={handleDownvote}
                                marginTop={2}
                                backgroundColor={messageDownvoted ? "purple.200" : ""}
                            >
                                <ArrowDownIcon />
                            </Button>

                            {!user.groups?.includes(group.groupId) ||
                            !user.groups?.includes(currentGroup?.groupId) ? null : (
                                <Button onClick={handleToggleReply} marginLeft={4} marginTop={2}>
                                    <ArrowLeftIcon marginRight={5} />
                                    {showReplyInput ? "Cancel Reply" : "Reply"}
                                </Button>
                            )}

                            {user.id == message.author.id ? (
                                <Button onClick={() => handleToggleEdit(message.message)} marginTop={2} marginLeft={5}>
                                    <EditIcon marginRight={5} />
                                    {showEditInput ? "Cancel Edit" : "Edit"}
                                </Button>
                            ) : null}

                            {user.id == message.author.id ? (
                                <Button onClick={() => onOpenDeleteMessage()} marginTop={2} marginLeft={5}>
                                    <DeleteIcon marginRight={5} />
                                    Delete
                                </Button>
                            ) : null}

                            {deleteMessageAlertDialog(message.id)}

                            {showReplyInput && (
                                <Box marginTop={4}>
                                    <FormControl isInvalid={replyError && replySubmitted}>
                                        <Textarea
                                            onChange={handleChangeReply}
                                            placeholder={"Reply to message..."}
                                            value={replyText}
                                            minH={"50px"}
                                            background={"white"}
                                            marginBottom={2}
                                        ></Textarea>
                                        <FormErrorMessage fontSize={16} marginBottom={2}>
                                            Reply cannot be empty.
                                        </FormErrorMessage>
                                    </FormControl>

                                    <Button style="primary" width="auto" variant="solid" onClick={handleSubmitReply}>
                                        Submit reply
                                    </Button>
                                </Box>
                            )}

                            {showEditInput && (
                                <Box marginTop={4}>
                                    <FormControl isInvalid={editError && editSubmitted}>
                                        <Textarea
                                            onChange={handleChangeEdit}
                                            placeholder={"Edit message..."}
                                            value={editText}
                                            minH={"50px"}
                                            background={"white"}
                                            marginBottom={2}
                                        ></Textarea>
                                        <FormErrorMessage fontSize={16} marginBottom={2}>
                                            Edit cannot be empty.
                                        </FormErrorMessage>
                                    </FormControl>

                                    <Button style="primary" width="auto" variant="solid" onClick={handleSubmitEdit}>
                                        Submit edit
                                    </Button>
                                </Box>
                            )}
                        </Flex>
                    </Box>
                </CardBody>
                {showReplies &&
                    messages
                        .filter((m) => m.parentDiscussionMessageId === message.id)
                        .map((childMessage) =>
                            childMessage.isDeleted ? (
                                <MessageDeleted
                                    key={childMessage.id}
                                    message={childMessage}
                                    messages={messages}
                                    group={group}
                                    depth={depth + 1}
                                />
                            ) : (
                                <Message
                                    key={childMessage.id}
                                    message={childMessage}
                                    messages={messages}
                                    group={group}
                                    depth={depth + 1}
                                />
                            )
                        )}
                {messages.some((m) => m.parentDiscussionMessageId === message.id) && (
                    <Text
                        marginLeft={2}
                        marginBottom={2}
                        color="blue.500"
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={toggleReplies}
                    >
                        {showReplies ? <Icon as={CloseIcon} mr={1} /> : <Icon as={AddIcon} mr={1} />}
                        {showReplies ? "Close replies" : "See replies"}
                    </Text>
                )}
            </div>
        );
    };

    const MessageDeleted = ({
        message,
        messages,
        group,
        depth,
    }: {
        message: DossierDiscussionMessage;
        messages: DossierDiscussionMessage[];
        group: ApprovalStage;
        depth: number;
    }) => {
        const marginLeft = `${depth * 20}px`;
        const colorDepth = `gray.${Math.min(depth * 100 + 100, 500)}`;

        const [showReplies, setShowReplies] = useState<boolean>(() => {
            const storedMessageState = localStorage.getItem(message.id);
            return storedMessageState ? JSON.parse(storedMessageState) : false;
        });

        const toggleReplies = () => {
            const newMessageState = !showReplies;
            setShowReplies(newMessageState);
            localStorage.setItem(message.id, JSON.stringify(newMessageState));
        };

        return (
            <div style={{ marginLeft: marginLeft }}>
                <CardBody key={group.groupId}>
                    <Box bg={colorDepth} p={2}>
                        <Text fontWeight="bold">
                            {message.author.firstName} {message.author.lastName}
                            <br />
                            {group.group.name}
                        </Text>
                        <Text>
                            {message.createdDate.toString().substring(0, 10)}{" "}
                            {new Date(message.createdDate).getHours().toString()}:
                            {new Date(message.createdDate).getMinutes().toString()}:
                            {new Date(message.createdDate).getSeconds().toString()}
                        </Text>
                        <Text>
                            Deleted: {message.modifiedDate.toString().substring(0, 10)}{" "}
                            {new Date(message.modifiedDate).getHours().toString()}:
                            {new Date(message.modifiedDate).getMinutes().toString()}:
                            {new Date(message.modifiedDate).getSeconds().toString()}]
                        </Text>
                        <Text mt={2}>[This message has been deleted.]</Text>

                        <Flex alignItems="center"></Flex>
                    </Box>
                </CardBody>
                {showReplies &&
                    messages
                        .filter((m) => m.parentDiscussionMessageId === message.id)
                        .map((childMessage) =>
                            childMessage.isDeleted ? (
                                <MessageDeleted
                                    key={childMessage.id}
                                    message={childMessage}
                                    messages={messages}
                                    group={group}
                                    depth={depth + 1}
                                />
                            ) : (
                                <Message
                                    key={childMessage.id}
                                    message={childMessage}
                                    messages={messages}
                                    group={group}
                                    depth={depth + 1}
                                />
                            )
                        )}
                {messages.some((m) => m.parentDiscussionMessageId === message.id) && (
                    <Text
                        marginLeft={2}
                        marginBottom={2}
                        color="blue.500"
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={toggleReplies}
                    >
                        {showReplies ? <Icon as={CloseIcon} mr={1} /> : <Icon as={AddIcon} mr={1} />}
                        {showReplies ? "Close replies" : "See replies"}
                    </Text>
                )}
            </div>
        );
    };

    const AllGroupsMessageList = () => {
        const allMessages = dossierDetails?.discussion.messages;
        const rootMessages = dossierDetails?.discussion.messages.filter((m) => !m.parentDiscussionMessageId);

        return (
            <div>
                {rootMessages
                    .sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())
                    .map((message) => (
                        <Card key={message.id}>
                            {dossierDetails?.approvalStages
                                .filter((stage) => message.groupId == stage.groupId)
                                .map((filteredGroup) =>
                                    message.isDeleted ? (
                                        <MessageDeleted
                                            key={message.id}
                                            message={message}
                                            messages={allMessages}
                                            group={filteredGroup}
                                            depth={0}
                                        />
                                    ) : (
                                        <Message
                                            key={message.id}
                                            message={message}
                                            messages={allMessages}
                                            group={filteredGroup}
                                            depth={0}
                                        />
                                    )
                                )}
                        </Card>
                    ))}
            </div>
        );
    };

    function displayHistoryModal() {
        setShowHistoryModal(true);
    }

    function closeHistoryModal() {
        setShowHistoryModal(false);
    }

    return (
        <>
            <Box>
                <form>
                    <Button
                        style="primary"
                        variant="outline"
                        width="fit-content"
                        height="40px"
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
                        onClick={() => navigate(BaseRoutes.Dossiers)}
                    >
                        My Dossiers
                    </Button>
                    <Button
                        style="primary"
                        variant="outline"
                        height="40px"
                        width="fit-content"
                        ml="2"
                        onClick={() => navigate(BaseRoutes.DossierDetails.replace(":dossierId", dossierId))}
                    >
                        Dossier Details
                    </Button>
                    <Button
                        style="primary"
                        variant="outline"
                        height="40px"
                        width="fit-content"
                        ml="2"
                        onClick={() => navigate(BaseRoutes.DossierReport.replace(":dossierId", dossierId))}
                    >
                        Dossier Report
                    </Button>
                    <Flex>
                        <Stack w="25%" p={8}>
                            <Stack marginBottom={10}>
                                <Heading
                                    color={"brandRed"}
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "fit-content",
                                    }}
                                >
                                    Dossier Review
                                </Heading>
                                <Heading color={"black"}>{dossierDetails?.title}</Heading>
                                <Kbd>{dossierDetails?.id}</Kbd>
                                <Text>{dossierDetails?.description}</Text>
                                <Text>
                                    <b>State:</b> {dossierStateToString(dossierDetails)}
                                </Text>
                                <Text>
                                    <b>Created: </b>
                                    {dossierDetails?.createdDate.toString().substring(0, 10)}{" "}
                                    {new Date(dossierDetails?.createdDate).getHours().toString()}:
                                    {new Date(dossierDetails?.createdDate).getMinutes().toString()}:
                                    {new Date(dossierDetails?.createdDate).getSeconds().toString()}
                                </Text>
                                <Text>
                                    <b>Updated: </b>
                                    {dossierDetails?.modifiedDate.toString().substring(0, 10)}{" "}
                                    {new Date(dossierDetails?.modifiedDate).getHours().toString()}:
                                    {new Date(dossierDetails?.modifiedDate).getMinutes().toString()}:
                                    {new Date(dossierDetails?.modifiedDate).getSeconds().toString()}
                                </Text>
                                {dossierDetails?.state == 3 ? (
                                    <Text fontWeight={"bold"} fontSize={20} color={"green"}>
                                        This dossier has been approved.
                                    </Text>
                                ) : dossierDetails?.state == 2 ? (
                                    <Text fontWeight={"bold"} fontSize={20} color={"red"}>
                                        This dossier has been rejected.
                                    </Text>
                                ) : (
                                    <Text>
                                        <b>Current Group:</b> {currentGroup?.group.name}
                                    </Text>
                                )}
                            </Stack>
                            {isGroupMaster && dossierDetails.state == 1 ? (
                                <Stack direction="row" spacing={4} align="center" marginBottom={10}>
                                    <Button
                                        background="brandBlue"
                                        variant="solid"
                                        onClick={() => {
                                            onOpenForward();
                                        }}
                                    >
                                        {currentGroup.isFinalStage ? "Accept Changes" : "Forward"}
                                    </Button>
                                    {currentGroup.stageIndex == 0 ? (
                                        ""
                                    ) : (
                                        <Button
                                            background="brandGray"
                                            variant="solid"
                                            onClick={() => {
                                                onOpenReturn();
                                            }}
                                        >
                                            Return
                                        </Button>
                                    )}

                                    <Button
                                        background="brandRed"
                                        variant="solid"
                                        onClick={() => {
                                            onOpenReject();
                                        }}
                                    >
                                        Reject
                                    </Button>
                                </Stack>
                            ) : (
                                ""
                            )}
                            <Stack>
                                <Button
                                    leftIcon={<CopyIcon />}
                                    width="200px"
                                    height="40px"
                                    mb="2"
                                    onClick={() => {
                                        displayHistoryModal();
                                    }}
                                >
                                    View History Log
                                </Button>
                            </Stack>
                            <Stack>
                                <Heading margin="auto" size="xl" color="brandRed">
                                    Changes
                                </Heading>
                                <Stack mb={4}>
                                    <Heading size={"md"} color="brandBlue">
                                        Course Creation Requests:
                                    </Heading>
                                    {/* TODO: Change the links below to the Course Details Page */}
                                    {dossierDetails?.courseCreationRequests?.map((courseCreationRequest) => (
                                        <Text key={courseCreationRequest.id} as="u">
                                            <Link to={BaseRoutes.ManageableGroup}>
                                                {courseCreationRequest.newCourse?.subject}{" "}
                                                {courseCreationRequest.newCourse?.catalog}
                                            </Link>
                                        </Text>
                                    ))}
                                </Stack>
                                <Stack mb={4}>
                                    <Heading size={"md"} color="brandBlue">
                                        Course Modification Requests:
                                    </Heading>
                                    {/* TODO: Change the link below to the Course Details Page */}
                                    {dossierDetails?.courseModificationRequests?.map((courseModificationRequest) => (
                                        <Text key={courseModificationRequest.id} as="u">
                                            <Link to={BaseRoutes.ManageableGroup}>
                                                {courseModificationRequest.course?.subject}{" "}
                                                {courseModificationRequest.course?.catalog}
                                            </Link>
                                        </Text>
                                    ))}
                                </Stack>
                                <Stack mb={4}>
                                    <Heading size={"md"} color="brandBlue">
                                        Course Deletion Requests:
                                    </Heading>
                                    {/* TODO: Change the link below to the Course Details Page */}
                                    {dossierDetails?.courseDeletionRequests?.map((courseDeletionRequest) => (
                                        <Text key={courseDeletionRequest.id} as="u">
                                            <Link to={BaseRoutes.ManageableGroup}>
                                                {courseDeletionRequest.course?.subject}{" "}
                                                {courseDeletionRequest.course?.catalog}
                                            </Link>
                                        </Text>
                                    ))}
                                </Stack>
                                <Stack mb={4}>
                                    <Heading size={"md"} color="brandBlue">
                                        Course Grouping Requests:
                                    </Heading>
                                    {dossierDetails?.courseGroupingRequests?.map((courseGroupingRequest) => (
                                        <Text key={courseGroupingRequest.id} as="u">
                                            <Link
                                                to={BaseRoutes.CourseGrouping.replace(
                                                    ":courseGroupingId",
                                                    courseGroupingRequest?.courseGrouping.id
                                                )}
                                            >
                                                {courseGroupingRequest?.courseGrouping.name}{" "}
                                            </Link>
                                        </Text>
                                    ))}
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack w="75%" p={8}>
                            <Stack>
                                <Center>
                                    <Heading as="h2" size="xl" color="brandRed">
                                        Discussion Board
                                    </Heading>
                                </Center>
                                <Stack>
                                    <Tabs defaultIndex={currentGroup?.stageIndex} isFitted variant="enclosed">
                                        <TabList overflowX="scroll" overflowY="hidden">
                                            <Tab>All Groups</Tab>
                                            {dossierDetails?.approvalStages
                                                ?.sort((a, b) => a.stageIndex - b.stageIndex)
                                                .map((stage) => <Tab key={stage.groupId}>{stage.group.name}</Tab>)}
                                        </TabList>

                                        {dossierDetails?.discussion.messages.length > 0 ? (
                                            <TabPanels>
                                                <TabPanel>
                                                    <AllGroupsMessageList />
                                                </TabPanel>
                                                {dossierDetails?.approvalStages
                                                    ?.sort((a, b) => a.stageIndex - b.stageIndex)
                                                    .map((stage) => (
                                                        <TabPanel key={stage.groupId}>
                                                            <Card>
                                                                {dossierDetails?.discussion.messages
                                                                    .filter(
                                                                        (message) =>
                                                                            stage.groupId == message.groupId &&
                                                                            !message.parentDiscussionMessageId
                                                                    )
                                                                    .sort(
                                                                        (a, b) =>
                                                                            new Date(a.createdDate).getTime() -
                                                                            new Date(b.createdDate).getTime()
                                                                    )
                                                                    .map((filteredMessage) =>
                                                                        filteredMessage.isDeleted ? (
                                                                            <MessageDeleted
                                                                                key={filteredMessage.id}
                                                                                message={filteredMessage}
                                                                                group={stage}
                                                                                messages={
                                                                                    dossierDetails?.discussion.messages
                                                                                }
                                                                                depth={0}
                                                                            />
                                                                        ) : (
                                                                            <Message
                                                                                key={filteredMessage.id}
                                                                                message={filteredMessage}
                                                                                group={stage}
                                                                                messages={
                                                                                    dossierDetails?.discussion.messages
                                                                                }
                                                                                depth={0}
                                                                            />
                                                                        )
                                                                    )}
                                                            </Card>
                                                        </TabPanel>
                                                    ))}
                                            </TabPanels>
                                        ) : (
                                            <Text marginTop={4}>There are no current messages.</Text>
                                        )}
                                    </Tabs>
                                </Stack>
                            </Stack>
                            {!isPartOfCurrentStageGroup || dossierDetails?.state == 2 || dossierDetails?.state == 3 ? (
                                ""
                            ) : (
                                <Stack marginTop={10}>
                                    <Center>
                                        <Heading as="h2" size="xl" color="brandRed">
                                            <Text align="center">Add Message</Text>
                                        </Heading>
                                    </Center>
                                    <Stack>
                                        <FormControl isInvalid={messageError && formSubmitted}>
                                            <Textarea
                                                onChange={handleChangeMessage}
                                                value={message}
                                                placeholder={"Add message to discussion board..."}
                                                minH={"150px"}
                                            ></Textarea>
                                            <FormErrorMessage>Message cannot be empty.</FormErrorMessage>
                                        </FormControl>
                                    </Stack>
                                    <Stack>
                                        <Button
                                            style="primary"
                                            width="auto"
                                            height="50px"
                                            variant="solid"
                                            onClick={() => {
                                                onOpenMessage();
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}
                        </Stack>
                    </Flex>
                </form>

                {showHistoryModal && (
                    <DossierHistoryModal
                        approvalHistories={dossierDetails.approvalHistories}
                        open={showHistoryModal}
                        closeModal={closeHistoryModal}
                    />
                )}
            </Box>
            {messageAlertDialog()}
            {forwardAlertDialog()}
            {returnAlertDialog()}
            {rejectAlertDialog()}
        </>
    );
}
