import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    useToast,
    Image,
} from "@chakra-ui/react";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { BaseRoutes } from "../constants";
import { User } from "../models/user";
import { showToast } from "../utils/toastUtils";
import { Link } from "react-router-dom";

export interface HeaderProps {
    setUser: (user: User | null) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setIsAdminOrGroupMaster: (isAdminOrGroupMaster: boolean) => void;
}

export default function Header(props: HeaderProps) {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast(); // Use the useToast hook

    function logOut() {
        logout().then(
            () => {
                props.setUser(null);
                props.setIsLoggedIn(false);
                props.setIsAdminOrGroupMaster(false);
                navigate(BaseRoutes.Login);
                showToast(toast, "Success!", "You have successfully logged out.", "success");
            },
            (rej) => {
                showToast(toast, "Error!", rej.message, "error");
            }
        );
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
            >
                <Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                    <Text
                        textAlign={useBreakpointValue({ base: "center", md: "left" })}
                        fontFamily={"heading"}
                        color={useColorModeValue("gray.800", "white")}
                    >
                        <Link to={BaseRoutes.Home} style={{ textDecoration: "none" }}>
                            <Image src={logo} height="50px" />
                        </Link>
                    </Text>

                    <Flex display={{ base: "none", md: "flex" }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
                    <Button style="primary" variant="outline" width="100px" height="40px" onClick={logOut}>
                        Log out
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");

    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Link to={navItem.href ?? "#"} style={{ textDecoration: "none" }}>
                                <Box
                                    as="div" // Use a <div> instead of <a> to avoid nesting anchor tags
                                    p={4}
                                    fontSize={"md"}
                                    fontWeight={500}
                                    color={linkColor}
                                    display={"flex"}
                                    alignItems={"center"}
                                    _hover={{
                                        color: linkHoverColor,
                                    }}
                                >
                                    {navItem.label}
                                </Box>
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={"xl"}
                                minW={"sm"}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Box
            as="a"
            href={href}
            role={"group"}
            display={"block"}
            p={2}
            rounded={"md"}
            _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
        >
            <Stack direction={"row"} align={"center"}>
                <Box>
                    <Text transition={"all .3s ease"} _groupHover={{ color: "pink.400" }} fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={"sm"}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={"all .3s ease"}
                    transform={"translateX(-10px)"}
                    opacity={0}
                    _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
                    justify={"flex-end"}
                    align={"center"}
                    flex={1}
                >
                    <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    );
};

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? "#"}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                >
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "Manage Dossiers",
        href: "/dossiers",
    },
    {
        label: "Review Proposal",
        href: "/dossierstoreview",
    },
    {
        label: "Current Change Log",
        href: "#",
    },
    {
        label: "User Settings",
        href: "#",
    },
    {
        label: "Groups",
        href: "#",
    },
    {
        label: "Course info",
        href: "/CourseBrowser",
    },
];
