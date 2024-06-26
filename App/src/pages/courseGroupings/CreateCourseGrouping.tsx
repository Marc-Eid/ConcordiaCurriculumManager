import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
    CourseGroupingCreationRequestDTO,
    CourseGroupingDTO,
    CourseGroupingModificationRequestDTO,
    CourseGroupingRequestDTO,
    CourseIdentifierDTO,
    SchoolEnum,
} from "../../models/courseGrouping"; // Adjust the import path as needed
import {
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Textarea,
    Checkbox,
    Select,
    Stack,
    HStack,
    Box,
    ButtonGroup,
    IconButton,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import {
    EditCourseGroupingCreation,
    EditCourseGroupingModification,
    GetCourseGrouping,
    InitiateCourseGroupingCreation,
    InitiateCourseGroupingModification,
} from "../../services/courseGrouping";
import { MinusIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BaseRoutes } from "../../constants";
import { showToast } from "../../utils/toastUtils";
import SelectCourseModal from "../dossier/SelectCourseModal";
import { getAllCourseSettings } from "../../services/course";
import { AllCourseSettings, CourseDataResponse } from "../../models/course";
import SearchCourseGrouping from "../../components/CourseGrouping/SearchCourseGrouping";
import CourseGroupingDiffViewer from "../../components/CourseDifference/CourseGroupingDifference";
import Button from "../../components/Button";
import DeleteAlert from "../../shared/DeleteAlert";

export default function CreateCourseGrouping() {
    const location = useLocation();
    const toast = useToast(); // Use the useToast hook
    const { dossierId, courseGroupingId } = useParams();

    const navigate = useNavigate();
    const state: { CourseGroupingRequest: CourseGroupingRequestDTO; api: string } = location.state;

    const [courseGrouping, setCourseGrouping] = useState<CourseGroupingDTO>();
    const [newCourseGrouing, setNewCourseGrouping] = useState<CourseGroupingDTO>();
    const [loading, setLoading] = useState<boolean>(false);
    const [courseSettings, setCourseSettings] = useState<AllCourseSettings>(null);
    const [courseIdentifiers, setCourseIdentifiers] = useState<CourseIdentifierDTO[]>([]);

    const [selectedCourse, setSelectedCourse] = useState<number>(null);
    const [selectedSubGroup, setSelectedSubGroup] = useState<number>(null);

    const {
        isOpen: isCourseSelectionOpen,
        onOpen: onCourseSelectionOpen,
        onClose: onCourseSelectionClose,
    } = useDisclosure();

    const {
        isOpen: isSearchCourseGroupingOpen,
        onOpen: onSearchCourseGroupingOpen,
        onClose: onSearchCourseGroupingClose,
    } = useDisclosure();

    const { isOpen: isDeleteAlertOpen, onOpen: onDeleteAlertOpen, onClose: onDeleteAlertClose } = useDisclosure();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isDirty },
        reset,
    } = useForm<CourseGroupingRequestDTO>({
        defaultValues: {
            courseGrouping: {
                isTopLevel: false,
            },
            ...state?.CourseGroupingRequest,
        },
    });
    const courseGroupingWatched = watch("courseGrouping"); // Watches the entire courseGrouping object
    const {
        fields: subGroupFields,
        append: appendSubGroupRef,
        remove: removeSubGroupRef,
    } = useFieldArray({
        control,
        name: "courseGrouping.subGroupingReferences",
    });

    const { append: appendSubGroup } = useFieldArray({
        control,
        name: "courseGrouping.subGroupings",
    });

    const {
        fields: courseFields,
        append: appendCourseIdentifier,
        remove: removeCourseIdentifier,
    } = useFieldArray({
        control,
        name: "courseGrouping.courseIdentifiers",
    });

    const { append: appendCourse } = useFieldArray({
        control,
        name: "courseGrouping.courses",
    });

    const fieldConfigurations = [
        {
            name: "courseGrouping.name",
            label: "Course Grouping Name",
            placeholder: "Enter the course grouping name",
            isRequired: true,
            type: "input",
        },
        {
            name: "courseGrouping.requiredCredits",
            label: "Required Credits",
            placeholder: "Enter required credits",
            isRequired: false,
            type: "input",
        },
        {
            name: "courseGrouping.description",
            label: "Description",
            placeholder: "Enter description",
            isRequired: false,
            type: "textarea",
        },
        {
            name: "courseGrouping.notes",
            label: "Notes",
            placeholder: "Enter notes",
            isRequired: false,
            type: "textarea",
        },
        {
            name: "courseGrouping.isTopLevel",
            label: "Top Level",
            placeholder: "This course group is a top level course group",
            isRequired: false,
            type: "checkbox",
        },
        {
            name: "courseGrouping.school", // Assuming 'school' is a dropdown field
            label: "School",
            isRequired: true,
            type: "select",
            options: [
                { value: SchoolEnum.GinaCody, label: "Gina Cody" },
                { value: SchoolEnum.ArtsAndScience, label: "Arts and Science" },
                { value: SchoolEnum.FineArts, label: "Fine Arts" },
                { value: SchoolEnum.JMSB, label: "JMSB" },
                // Add other options as needed
            ],
        },
        { name: "rationale", label: "Rationale", placeholder: "Enter Rational", isRequired: false, type: "textarea" },
        {
            name: "resourceImplication",
            label: "Resource Implication",
            placeholder: "Enter Resource Implication",
            isRequired: false,
            type: "textarea",
        },
        {
            name: "comment",
            label: "Comment",
            placeholder: "Enter Comment",
            isRequired: false,
            type: "textarea",
        },
    ];

    useEffect(() => {
        if (
            state?.api === "editGroupingCreationRequest" ||
            state?.api === "addGroupingModificationRequest" ||
            state?.api === "editGroupingModificationRequest"
        ) {
            requestCourseGroupingById(courseGroupingId);
        }
        requestCourseSettings();

        window.scrollTo(0, 0);
    }, [dossierId, courseGroupingId]);

    function requestCourseGroupingById(Id: string) {
        GetCourseGrouping(Id).then((response) => {
            setCourseGrouping(response.data);

            response.data.courses.forEach((course) => {
                const courseIdentifier = {
                    concordiaCourseId: course.courseID,
                    subject: course.subject,
                    catalog: parseInt(course.catalog),
                };

                setCourseIdentifiers((prev) => [...prev, courseIdentifier]);
            });

            reset({
                courseGrouping: {
                    ...response.data,
                },
            });
        });
    }

    function requestCourseSettings() {
        getAllCourseSettings().then((res) => {
            setCourseSettings(res.data);
        });
    }

    function requestEditCourseGroupingCreation(
        dossierId: string,
        requestId: string,
        courseGroupingCreationRequest: CourseGroupingCreationRequestDTO
    ) {
        setLoading(true);
        EditCourseGroupingCreation(dossierId, requestId, courseGroupingCreationRequest)
            .then(
                () => {
                    showToast(toast, "Success!", "Course grouping creation request edited.", "success");
                    setLoading(false);
                    navigate(BaseRoutes.DossierDetails.replace(":dossierId", dossierId));
                },
                () => {
                    showToast(toast, "Error!", "Course grouping creation request could not be edited.", "error");
                    setLoading(false);
                }
            )
            .catch(() => {
                showToast(toast, "Error!", "Course grouping creation request could not be edited.", "error");
                setLoading(false);
            });
    }

    function requestInitiateCourseGroupingCreation(
        dossierId: string,
        courseGroupingCreationRequest: CourseGroupingCreationRequestDTO
    ) {
        setLoading(true);
        InitiateCourseGroupingCreation(dossierId, courseGroupingCreationRequest)
            .then(
                () => {
                    showToast(toast, "Success!", "Course grouping creation request initiated.", "success");
                    setLoading(false);
                    navigate(BaseRoutes.DossierDetails.replace(":dossierId", dossierId));
                },
                () => {
                    showToast(toast, "Error!", "Course grouping creation request could not be initiated.", "error");
                    setLoading(false);
                }
            )
            .catch(() => {
                showToast(toast, "Error!", "Course grouping creation request could not be initiated.", "error");
                setLoading(false);
            });
    }

    function requestInitiateCourseGroupingModification(
        dossierId: string,
        courseModificationRequest: CourseGroupingModificationRequestDTO
    ) {
        InitiateCourseGroupingModification(dossierId, courseModificationRequest)
            .then(
                () => {
                    showToast(toast, "Success!", "Course grouping modification request initiated.", "success");
                    setLoading(false);
                    navigate(BaseRoutes.DossierDetails.replace(":dossierId", dossierId));
                },
                () => {
                    showToast(toast, "Error!", "Course grouping modification request could not be initiated.", "error");
                    setLoading(false);
                }
            )
            .catch(() => {
                showToast(toast, "Error!", "Course grouping modification request could not be initiated.", "error");
                setLoading(false);
            });
    }

    function requestEditCourseGroupingModification(
        dossierId: string,
        courseGroupingId: string,
        courseGroupingModificationRequest: CourseGroupingModificationRequestDTO
    ) {
        EditCourseGroupingModification(dossierId, courseGroupingId, courseGroupingModificationRequest)
            .then(
                () => {
                    showToast(toast, "Success!", "Course grouping modification request edited.", "success");
                    setLoading(false);
                    navigate(BaseRoutes.DossierDetails.replace(":dossierId", dossierId));
                },
                () => {
                    showToast(toast, "Error!", "Course grouping modification request could not be edited.", "error");
                    setLoading(false);
                }
            )
            .catch(() => {
                showToast(toast, "Error!", "Course grouping modification request could not be edited.", "error");
                setLoading(false);
            });
    }

    function onSubmit(data) {
        data.dossierId = dossierId;
        data.courseGrouping.school = Number(data.courseGrouping.school);

        //TODO: need to check which api to call based on the state.api
        if (state?.api === "editGroupingCreationRequest") {
            requestEditCourseGroupingCreation(dossierId, state.CourseGroupingRequest.id, data);
        } else if (state?.api === "addGroupingModificationRequest") {
            requestInitiateCourseGroupingModification(dossierId, data);
        } else if (state?.api === "editGroupingModificationRequest") {
            requestEditCourseGroupingModification(dossierId, state.CourseGroupingRequest.id, data);
        } else {
            requestInitiateCourseGroupingCreation(dossierId, data);
        }
    }

    function displaySelectCourseModal() {
        return (
            <SelectCourseModal
                isOpen={isCourseSelectionOpen}
                onClose={onCourseSelectionClose}
                allCourseSettings={courseSettings}
                dossierId={dossierId}
                onCourseSelect={handleCourseSelect}
            ></SelectCourseModal>
        );
    }

    function displaySearchCourseGroupModal() {
        return (
            <SearchCourseGrouping
                isOpen={isSearchCourseGroupingOpen}
                onClose={onSearchCourseGroupingClose}
                onSelectCourseGrouping={handleCourseGroupingSelect}
                isEdit={false}
                dossierId={dossierId}
            />
        );
    }

    function handleCourseSelect(res: CourseDataResponse) {
        appendCourseIdentifier({
            concordiaCourseId: res.data.courseID,
            subject: res.data.subject,
            catalog: parseInt(res.data.catalog),
        });
        appendCourse(res.data);
    }

    function handleCourseGroupingSelect(res) {
        appendSubGroupRef({
            name: res.name,
            childGroupCommonIdentifier: res.commonIdentifier,
            groupingType: res.groupingType,
        });
        appendSubGroup(res);
    }

    function handleRemoveCourse(index) {
        removeCourseIdentifier(index);
        setSelectedCourse(null);
        onDeleteAlertClose();
    }

    function handleRemoveSubGroup(index) {
        removeSubGroupRef(index);
        setSelectedSubGroup(null);
        onDeleteAlertClose();
    }

    function handleDeleteAlertClose() {
        setSelectedCourse(null);
        setSelectedSubGroup(null);
        onDeleteAlertClose();
    }

    function deleteRequestAlert() {
        if (selectedCourse !== null) {
            console.log(courseFields);
            return (
                <DeleteAlert
                    isOpen={isDeleteAlertOpen}
                    onClose={handleDeleteAlertClose}
                    loading={loading}
                    headerTitle="Delete Course"
                    title={
                        (courseFields?.at(selectedCourse)?.subject ||
                            courseIdentifiers.find(
                                (c) => c.concordiaCourseId === courseFields?.at(selectedCourse)?.concordiaCourseId
                            )?.subject) +
                        " " +
                        (courseFields?.at(selectedCourse)?.catalog?.toString() ||
                            courseIdentifiers
                                .find(
                                    (c) => c.concordiaCourseId === courseFields?.at(selectedCourse)?.concordiaCourseId
                                )
                                ?.catalog?.toString())
                    }
                    item={selectedCourse}
                    onDelete={handleRemoveCourse}
                />
            );
        } else if (selectedSubGroup !== null) {
            return (
                <DeleteAlert
                    isOpen={isDeleteAlertOpen}
                    onClose={handleDeleteAlertClose}
                    loading={loading}
                    headerTitle="Delete sub grouping"
                    title={
                        subGroupFields?.at(selectedSubGroup)?.name ||
                        courseGrouping?.subGroupings.find(
                            (c) =>
                                c.commonIdentifier === subGroupFields?.at(selectedSubGroup)?.childGroupCommonIdentifier
                        )?.name
                    }
                    item={selectedSubGroup}
                    onDelete={handleRemoveSubGroup}
                />
            );
        }
    }
    useEffect(() => {
        setNewCourseGrouping(() => ({
            ...courseGroupingWatched,
        }));
    }, [JSON.stringify(courseGroupingWatched)]);

    return (
        <>
            {displaySelectCourseModal()}
            {displaySearchCourseGroupModal()}
            {deleteRequestAlert()}
            {courseGrouping && (
                <CourseGroupingDiffViewer
                    oldGrouping={courseGrouping}
                    newGrouping={newCourseGrouing}
                ></CourseGroupingDiffViewer>
            )}

            <Stack m={4}>
                <Button
                    style="primary"
                    variant="outline"
                    height="40px"
                    width="fit-content"
                    onClick={() => navigate(BaseRoutes.DossierDetails.replace(":dossierId", dossierId))}
                >
                    Back to Dossier
                </Button>

                <Center m={4}>
                    <Heading>
                        {state?.api === "editGroupingCreationRequest" ||
                        state?.api === "addGroupingModificationRequest" ||
                        state?.api === "editGroupingModificationRequest"
                            ? "Edit Course Grouping"
                            : "Add Course Grouping"}
                    </Heading>
                </Center>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HStack>
                        <Stack width="50%">
                            {fieldConfigurations.map(({ name, label, placeholder, isRequired, type, options }) => (
                                <FormControl key={name} isInvalid={!!errors.courseGrouping?.[name]} p={2}>
                                    <FormLabel htmlFor={name}>{label}</FormLabel>
                                    <Controller
                                        name={name}
                                        control={control}
                                        rules={isRequired ? { required: `${label} is required` } : {}}
                                        render={({ field }) => {
                                            switch (type) {
                                                case "textarea":
                                                    return <Textarea {...field} id={name} placeholder={placeholder} />;
                                                case "checkbox":
                                                    return (
                                                        <>
                                                            <Checkbox
                                                                {...field}
                                                                id={name}
                                                                isChecked={field.value}
                                                                pt={1}
                                                                mr={2}
                                                            />
                                                            <span>{placeholder}</span>
                                                        </>
                                                    );
                                                case "select":
                                                    return (
                                                        <Select
                                                            {...field}
                                                            id={name}
                                                            placeholder={`Select ${label.toLowerCase()}`}
                                                        >
                                                            {options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    );
                                                default:
                                                    return <Input {...field} id={name} placeholder={placeholder} />;
                                            }
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {errors.courseGrouping?.[name] && errors.courseGrouping[name].message}
                                    </FormErrorMessage>
                                </FormControl>
                            ))}
                        </Stack>
                        <Stack width="50%" alignSelf="baseline">
                            <FormControl border="1px solid" borderRadius={5} p={2} borderColor={"gray.200"}>
                                <FormLabel htmlFor="subGroupingReferences">Select the Sub Course Grouping:</FormLabel>
                                <HStack>
                                    <Button onClick={onSearchCourseGroupingOpen}>Add</Button>
                                </HStack>
                                {subGroupFields.map((field, index) => (
                                    <Box key={field.id} mt={2}>
                                        <HStack
                                            justifyContent="space-between"
                                            border="1px solid"
                                            borderRadius={5}
                                            p={2}
                                            borderColor={"gray.200"}
                                        >
                                            <div>
                                                {index + 1 + ". "}
                                                {field.name ||
                                                    courseGrouping?.subGroupings.find(
                                                        (c) => c.commonIdentifier === field.childGroupCommonIdentifier
                                                    )?.name}
                                                {" - "}
                                                {field.groupingType === 0 ? " (Sub Grouping)" : " (Optional Grouping)"}
                                            </div>
                                            <ButtonGroup
                                                size="sm"
                                                isAttached
                                                variant="outline"
                                                ml="10px"
                                                onClick={() => {
                                                    setSelectedSubGroup(index);
                                                    onDeleteAlertOpen();
                                                }}
                                            >
                                                <IconButton
                                                    rounded="full"
                                                    aria-label="Add to friends"
                                                    icon={<MinusIcon />}
                                                />
                                            </ButtonGroup>
                                        </HStack>
                                    </Box>
                                ))}
                            </FormControl>
                            <FormControl border="1px solid" borderRadius={5} p={2} borderColor={"gray.200"}>
                                <FormLabel htmlFor="subGroupingReferences">Select the courses:</FormLabel>
                                <HStack>
                                    <Button
                                        onClick={() => {
                                            onCourseSelectionOpen();
                                        }}
                                    >
                                        Add
                                    </Button>
                                </HStack>
                                {courseFields.map((field, index) => (
                                    <Box key={field.id} mt={2}>
                                        <HStack
                                            justifyContent="space-between"
                                            border="1px solid"
                                            borderRadius={5}
                                            p={2}
                                            borderColor={"gray.200"}
                                        >
                                            <div>
                                                {index + 1 + ". "}
                                                {field.subject ||
                                                    courseIdentifiers.find(
                                                        (c) => c.concordiaCourseId === field.concordiaCourseId
                                                    )?.subject}{" "}
                                                {field.catalog ||
                                                    courseIdentifiers.find(
                                                        (c) => c.concordiaCourseId === field.concordiaCourseId
                                                    )?.catalog}{" "}
                                                -{" " + field.concordiaCourseId}
                                            </div>
                                            <ButtonGroup
                                                size="sm"
                                                isAttached
                                                variant="outline"
                                                ml="10px"
                                                onClick={() => {
                                                    setSelectedCourse(index);
                                                    onDeleteAlertOpen();
                                                }}
                                            >
                                                <IconButton
                                                    rounded="full"
                                                    aria-label="Add to friends"
                                                    icon={<MinusIcon />}
                                                />
                                            </ButtonGroup>
                                        </HStack>
                                    </Box>
                                ))}
                            </FormControl>
                            <Button mt={4} isLoading={loading} loadingText="Submit" isDisabled={!isDirty} type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </HStack>
                </form>
            </Stack>
        </>
    );
}
