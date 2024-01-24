import { useToast, Card, Text, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Course } from "../models/course";
import { getCourseData } from "../services/course";
import { showToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import { BaseRoutes } from "../constants";
import Button from "../components/Button";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function CourseDetails() {
    const query = useQuery(); // Use the useQuery function
    const [courseData, setCourseData] = useState<Course>(null);
    const subject: string = query.get("subject");
    const catalogNumber: number = Number(query.get("catalog"));
    const navigate = useNavigate();

    const toast = useToast();

    useEffect(() => {
        getCourseData(subject, catalogNumber)
            .then((res) => {
                setCourseData(res.data);
            })
            .catch((err) => {
                showToast(toast, "Error!", err, "error");
            });
    }, []);

    return (
        <div style={{ maxWidth: "50%", marginLeft: "25%", marginRight: "25%", paddingTop: "100px" }}>
            <Card key={courseData?.courseID} marginBottom={20} padding={15} style={{ backgroundColor: "#e9e3d3" }}>
                <Heading as="h1" size="md" marginBottom={8}>
                    {courseData?.subject} {courseData?.catalog} {courseData?.title} ({parseInt(courseData?.creditValue)}
                    credits)
                </Heading>
                <Text marginBottom={5}>
                    <Text as="b" marginRight={2}>
                        Prerequisite/Corequisite:
                    </Text>{" "}
                    Permission of the GCS is required.{" "}
                </Text>
                <Text marginBottom={5}>
                    <Text as="b" marginRight={2}>
                        Description:
                    </Text>{" "}
                    {courseData?.description}{" "}
                </Text>
                <Button
                    style="secondary"
                    variant="solid"
                    width="240px"
                    height="40px"
                    margin="auto"
                    onClick={() => navigate(BaseRoutes.CourseBrowser)}
                >
                    Go back to browser
                </Button>
            </Card>
        </div>
    );
}
