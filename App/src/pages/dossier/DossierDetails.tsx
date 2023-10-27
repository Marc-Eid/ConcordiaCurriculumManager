import { useEffect, useState } from "react";
import { DossierDetailsDTO, DossierDetailsResponse } from "../../models/dossier";
import { getDossierDetails } from "../../services/dossier";
import { useParams } from "react-router-dom";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Kbd,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";

export default function DossierDetails() {
    const { dossierId } = useParams();
    const [dossierDetails, setDossierDetails] = useState<DossierDetailsDTO | null>(null);

    useEffect(() => {
        requestDossierDetails(dossierId);
    }, [dossierId]);

    function requestDossierDetails(dossierId: string) {
        getDossierDetails(dossierId).then((res: DossierDetailsResponse) => {
            setDossierDetails(res.data);
            console.log(res.data);
        });
    }

    return (
        <>
            <div style={{ margin: "auto", width: "fit-content" }}>
                <Heading color={"brandRed"}>{dossierDetails?.title}</Heading>
                <Kbd>{dossierDetails?.id}</Kbd>
                <Text>{dossierDetails?.description}</Text>
                <Text>published: {dossierDetails?.published ? "yes" : "no"}</Text>
                <Text>created: {dossierDetails?.createdDate.toString()}</Text>
                <Text>updated: {dossierDetails?.modifiedDate.toString()}</Text>
            </div>

            <Box backgroundColor={"brandRed"} m={"auto"} mt={5} p="3" width={"70%"} borderRadius={"lg"} minH={"400px"}>
                <Heading size={"md"} color={"white"} textAlign={"center"} mb={2}>
                    Course Creation Requests
                </Heading>
                <SimpleGrid
                    templateColumns="repeat(auto-fill, minmax(200px, 400px))"
                    spacing={4}
                    justifyContent={"center"}
                >
                    <Card boxShadow={"xl"}>
                        <CardBody>
                            <Stack spacing="4">
                                <Heading size="md" color={"brandRed"}>
                                    Course Title
                                </Heading>
                                <Stack>
                                    <Kbd width={"fit-content"}>Course ID: filler</Kbd>
                                    <Kbd width={"fit-content"}>Subject: filler</Kbd>
                                    <Kbd width={"fit-content"}>Catalog: filler</Kbd>
                                </Stack>
                                <Text>
                                    Course description Course description Course description Course description Course
                                    description Course description Course description Course description Course
                                    description Course description
                                </Text>
                                <Text>Credits: filler</Text>
                                <Text>Prerequisites: filler</Text>
                                <Text>Equivalent Courses: filler</Text>
                                <Text>Career: filler</Text>
                                <Text>Course State: filler</Text>
                                <Text>Version: filler</Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing="2">
                                <Button variant="solid" colorScheme="blue">
                                    View
                                </Button>
                                <Button variant="ghost" colorScheme="blue">
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card boxShadow={"xl"}>
                        <CardBody>
                            <Stack spacing="4">
                                <Heading size="md" color={"brandRed"}>
                                    Course Title
                                </Heading>
                                <Stack>
                                    <Kbd width={"fit-content"}>Course ID: filler</Kbd>
                                    <Kbd width={"fit-content"}>Subject: filler</Kbd>
                                    <Kbd width={"fit-content"}>Catalog: filler</Kbd>
                                </Stack>
                                <Text>
                                    Course description Course description Course description Course description Course
                                    description Course description Course description Course description Course
                                    description Course description
                                </Text>
                                <Text>Credits: filler</Text>
                                <Text>Prerequisites: filler</Text>
                                <Text>Equivalent Courses: filler</Text>
                                <Text>Career: filler</Text>
                                <Text>Course State: filler</Text>
                                <Text>Version: filler</Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing="2">
                                <Button variant="solid" colorScheme="blue">
                                    View
                                </Button>
                                <Button variant="ghost" colorScheme="blue">
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card boxShadow={"xl"}>
                        <CardBody>
                            <Stack spacing="4">
                                <Heading size="md" color={"brandRed"}>
                                    Course Title
                                </Heading>
                                <Stack>
                                    <Kbd width={"fit-content"}>Course ID: filler</Kbd>
                                    <Kbd width={"fit-content"}>Subject: filler</Kbd>
                                    <Kbd width={"fit-content"}>Catalog: filler</Kbd>
                                </Stack>
                                <Text>
                                    Course description Course description Course description Course description Course
                                    description Course description Course description Course description Course
                                    description Course description
                                </Text>
                                <Text>Credits: filler</Text>
                                <Text>Prerequisites: filler</Text>
                                <Text>Equivalent Courses: filler</Text>
                                <Text>Career: filler</Text>
                                <Text>Course State: filler</Text>
                                <Text>Version: filler</Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing="2">
                                <Button variant="solid" colorScheme="blue">
                                    View
                                </Button>
                                <Button variant="ghost" colorScheme="blue">
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardBody>
                            <Stack spacing="4">
                                <Heading size="md">Course Title</Heading>
                                <Text>
                                    Course description Course description Course description Course description Course
                                    description
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing="2">
                                <Button variant="solid" colorScheme="blue">
                                    View
                                </Button>
                                <Button variant="ghost" colorScheme="blue">
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardBody>
                            <Stack spacing="4">
                                <Heading size="md">Course Title</Heading>
                                <Text>
                                    Course description Course description Course description Course description Course
                                    description
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing="2">
                                <Button variant="solid" colorScheme="blue">
                                    View
                                </Button>
                                <Button variant="ghost" colorScheme="blue">
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </SimpleGrid>
            </Box>
            <Box backgroundColor="brandBlue" m={"auto"} mt={5} p="3" width={"70%"} borderRadius={"lg"} minH={"400px"}>
                <Heading size={"md"} color={"white"} textAlign={"center"} mb={2}>
                    Course Modification Requests
                </Heading>
            </Box>
        </>
    );
}
