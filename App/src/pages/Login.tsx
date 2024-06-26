import React, { useEffect } from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    Text,
    FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    useToast,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { AuthenticationResponse, decodeTokenToUser, isAdminOrGroupMaster, login, LoginDTO } from "../services/auth";
import { User } from "../models/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BaseRoutes } from "../constants";
import { showToast } from "../utils/toastUtils";

export interface LoginProps {
    setUser: (user: User | null) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setIsAdminOrGroupMaster: (isAdminOrGroupMaster: boolean) => void;
}

export default function Login(props: LoginProps) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginDTO>();
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const toast = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(true); // Set default to true

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (!rememberMe) {
                // Clear the token from local storage if "Remember me" is not checked
                localStorage.removeItem("accessToken");
            } else {
                // Clear the token from session storage if "Remember me" is checked
                sessionStorage.removeItem("accessToken");
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // Check if "Remember me" is enabled on page load
        const storedRememberMe = localStorage.getItem("rememberMe");
        if (storedRememberMe !== null) {
            setRememberMe(JSON.parse(storedRememberMe));
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    function onSubmit(data: LoginDTO) {
        setLoading(true);
        setShowError(false);
        login(data)
            .then(
                (res: AuthenticationResponse) => {
                    if (res.data.accessToken != null) {
                        const user: User = decodeTokenToUser(res.data.accessToken);
                        props.setUser(user);
                        props.setIsLoggedIn(true);
                        props.setIsAdminOrGroupMaster(isAdminOrGroupMaster(user));
                        navigate("/");
                        if (rememberMe) {
                            localStorage.setItem("accessToken", res.data.accessToken); // Save to local storage if "Remember me" is checked
                            localStorage.setItem("token", res.data.accessToken);
                        } else {
                            sessionStorage.setItem("accessToken", res.data.accessToken); // Save to session storage if "Remember me" is not checked
                        }
                        showToast(toast, "Success!", "You have successfully logged in.", "success");
                    }
                },
                (rej) => {
                    console.log(rej);
                    if (rej.response?.status === 400) {
                        setShowError(true);
                        showToast(toast, "Error!", "Incorrect Credentials", "error");
                    } else {
                        showToast(toast, "Error!", rej.message, "error");
                    }
                }
            )
            .finally(() => setLoading(false));
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
                    <Stack spacing="8">
                        <Stack spacing="6">
                            <Image src={logo} width="50px" height="50px" margin="auto" />
                            <Heading textAlign="center" size="lg">
                                Log in to your account
                            </Heading>
                        </Stack>
                        <Box
                            py={{ base: "0", sm: "8" }}
                            px={{ base: "4", sm: "10" }}
                            bg={{ base: "transparent", sm: "bg.surface" }}
                            boxShadow={{ base: "none", sm: "2xl" }}
                            borderRadius={{ base: "none", sm: "xl" }}
                        >
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    {showError && <Text color="red">Incorrect Credentials</Text>}
                                    <FormControl>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register("email", {
                                                required: true,
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            })}
                                        />
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <InputGroup>
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                {...register("password", {
                                                    required: true,
                                                })}
                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                                                    {showPassword ? "Hide" : "Show"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                                <HStack justify="space-between">
                                    <Checkbox defaultChecked onChange={(e) => setRememberMe(e.target.checked)}>
                                        Remember me
                                    </Checkbox>
                                    <Button
                                        variant="text"
                                        size="sm"
                                        onClick={() => navigate(BaseRoutes.ResetPasswordEmail)}
                                    >
                                        Forgot password?
                                    </Button>
                                </HStack>
                                <Stack spacing="6">
                                    <Button
                                        isLoading={loading}
                                        loadingText="Sign in"
                                        backgroundColor="#932439"
                                        color="white"
                                        _hover={{ bg: "#7A1D2E" }}
                                        type="submit"
                                    >
                                        Sign in
                                    </Button>
                                </Stack>
                                <Stack spacing="6">
                                    <Button
                                        backgroundColor="#932439"
                                        color="white"
                                        _hover={{ bg: "#7A1D2E" }}
                                        onClick={() => navigate(BaseRoutes.Register)}
                                    >
                                        Register New Account
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </form>
        </>
    );
}
