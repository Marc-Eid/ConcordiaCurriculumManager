import { useEffect, useState } from "react";
import {
    DossierViewCountDTO,
    DossierViewResponseDTO,
    GetTopDossierViewingUser,
    GetTopHitHttpEndpoints,
    GetTopHttpStatusCodes,
    GetTopViewedDossiers,
    HttpEndpointCountDTO,
    HttpEndpointResponseDTO,
    HttpStatusCountDTO,
    HttpStatusResponseDTO,
    UserDossierViewedCountDTO,
    UserDossierViewedResponseDTO,
} from "../services/metrics";
import { Box, Flex, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { Button as ChakraButton } from "@chakra-ui/react";

export default function Metrics() {
    const [httpEndpointCount, setHttpEndpointCount] = useState<HttpEndpointCountDTO[]>([]);
    const [httpStatusCount, setHttpStatusCount] = useState<HttpStatusCountDTO[]>([]);
    const [dossierViewCount, setDossierViewCount] = useState<DossierViewCountDTO[]>([]);
    const [userDossierViewedCount, setUserDossierViewedCount] = useState<UserDossierViewedCountDTO[]>([]);
    const [endpointIndex, setEndpointIndex] = useState<number>();
    const [statusIndex, setStatusIndex] = useState<number>();
    const [dossierViewIndex, setDossierViewIndex] = useState<number>();
    const [userDossierIndex, setUserDossierIndex] = useState<number>();

    function getHttpEndpoints(index: number) {
        GetTopHitHttpEndpoints(index)
            .then((res) => res.data)
            .then(
                (res: HttpEndpointResponseDTO) => {
                    setHttpEndpointCount(res.result);
                    setEndpointIndex(res.nextIndex);
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function getMoreHttpEndpoints(index: number) {
        GetTopHitHttpEndpoints(index)
            .then((res) => res.data)
            .then(
                (res: HttpEndpointResponseDTO) => {
                    setHttpEndpointCount([...httpEndpointCount, ...res.result]);
                    setEndpointIndex(res.nextIndex);
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function getDossierViews(index: number) {
        GetTopViewedDossiers(index)
            .then((res) => res.data)
            .then(
                (res: DossierViewResponseDTO) => {
                    setDossierViewCount(res.result);
                    setDossierViewIndex(res.nextIndex);
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function getMoreDossierViews(index: number) {
        GetTopViewedDossiers(index)
            .then((res) => res.data)
            .then(
                (res: DossierViewResponseDTO) => {
                    setDossierViewCount([...dossierViewCount, ...res.result]);
                    setDossierViewIndex(res.nextIndex);
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function getHttpStatuses(index: number) {
        GetTopHttpStatusCodes(index)
            .then((res) => res.data)
            .then(
                (res: HttpStatusResponseDTO) => {
                    setHttpStatusCount(res.result);
                    setStatusIndex(res.nextIndex);
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function getMoreHttpStatuses(index: number) {
        GetTopHttpStatusCodes(index)
            .then((res) => res.data)
            .then(
                (res: HttpStatusResponseDTO) => {
                    setHttpStatusCount([...httpStatusCount, ...res.result]);
                    setStatusIndex(res.nextIndex);
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function getUserViewedDossiers(index: number) {
        GetTopDossierViewingUser(index)
            .then((res) => res.data)
            .then(
                (res: UserDossierViewedResponseDTO) => {
                    setUserDossierViewedCount(res.result);
                    setUserDossierIndex(res.nextIndex);
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function getMoreUserViewedDossiers(index: number) {
        GetTopDossierViewingUser(index)
            .then((res) => res.data)
            .then(
                (res: UserDossierViewedResponseDTO) => {
                    setUserDossierViewedCount([...userDossierViewedCount, ...res.result]);
                    setUserDossierIndex(res.nextIndex);
                },
                (rej) => {
                    console.log(rej);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getHttpEndpoints(0);
        getDossierViews(0);
        getUserViewedDossiers(0);
        getHttpStatuses(0);
        console.log("Initial Data Fetched");
    }, []);

    return (
        <div>
            <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                Available Metrics
            </Text>

            <Box maxW="5xl" m="auto">
                <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                    Http Endpoint Count
                </Text>
                <Table variant="simple" size="md" borderRadius="xl" boxShadow="xl" border="2px" margin="5px">
                    <Thead backgroundColor={"#e2e8f0"}>
                        <Tr>
                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                Endpoint
                            </Th>
                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                FullPath
                            </Th>
                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                Count
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {httpEndpointCount.map((endpoint) => (
                            <Tr key={endpoint.fullPath}>
                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {endpoint.endpoint}
                                </Td>
                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {endpoint.fullPath}
                                </Td>
                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {endpoint.count}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td height={20}>
                                <Flex>
                                    <ChakraButton
                                        variant="outline"
                                        mr={4}
                                        p={4}
                                        onClick={() => getMoreHttpEndpoints(endpointIndex)}
                                        isDisabled={endpointIndex < httpEndpointCount.length}
                                    >
                                        More
                                    </ChakraButton>
                                </Flex>
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
                <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                    Http Status Count
                </Text>
                <Table variant="simple" size="md" borderRadius="xl" boxShadow="xl" border="2px" margin="5px">
                    <Thead backgroundColor={"#e2e8f0"}>
                        <Tr>
                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                Status
                            </Th>

                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                Count
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {httpStatusCount.map((status) => (
                            <Tr key={status.httpStatus}>
                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {status.httpStatus}
                                </Td>

                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {status.count}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td height={20}>
                                <Flex>
                                    <ChakraButton
                                        mr={4}
                                        p={4}
                                        variant="outline"
                                        onClick={() => getMoreHttpStatuses(statusIndex)}
                                        isDisabled={statusIndex < httpStatusCount.length}
                                    >
                                        More
                                    </ChakraButton>
                                </Flex>
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
                <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                    Dossier Views
                </Text>
                <Table variant="simple" size="md" borderRadius="xl" boxShadow="xl" border="2px" margin="5px">
                    <Thead backgroundColor={"#e2e8f0"}>
                        <Tr>
                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                Dossier Name
                            </Th>
                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                Dossier State
                            </Th>
                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                Count
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dossierViewCount.map((dossier) => (
                            <Tr key={dossier.dossier.id}>
                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {dossier.dossier.title}
                                </Td>
                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {dossier.dossier.state}
                                </Td>
                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {dossier.count}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td height={20}>
                                <Flex>
                                    <ChakraButton
                                        mr={4}
                                        p={4}
                                        variant="outline"
                                        onClick={() => getMoreDossierViews(dossierViewIndex)}
                                        isDisabled={dossierViewIndex < dossierViewCount.length}
                                    >
                                        More
                                    </ChakraButton>
                                </Flex>
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
                <Text textAlign="center" fontSize="3xl" fontWeight="bold" marginTop="7%" marginBottom="5">
                    Users with Viewed Dossiers
                </Text>
                <Table variant="simple" size="md" borderRadius="xl" boxShadow="xl" border="2px" margin="5px">
                    <Thead backgroundColor={"#e2e8f0"}>
                        <Tr>
                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                User Email
                            </Th>

                            <Th whiteSpace="nowrap" textAlign={"center"}>
                                Count
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {userDossierViewedCount.map((user) => (
                            <Tr key={user.user.id}>
                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {user.user.email}
                                </Td>

                                <Td whiteSpace="nowrap" padding="16px" textAlign="center">
                                    {user.count}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td height={20}>
                                <Flex>
                                    <ChakraButton
                                        mr={4}
                                        p={4}
                                        variant="outline"
                                        onClick={() => getMoreUserViewedDossiers(userDossierIndex)}
                                        isDisabled={userDossierIndex < userDossierViewedCount.length}
                                    >
                                        More
                                    </ChakraButton>
                                </Flex>
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </Box>
        </div>
    );
}
