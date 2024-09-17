import React, { useState } from 'react';
import { Link as RouterLink, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import { Box, Flex, HStack, Button, Text, Link, useColorModeValue, Collapse, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const buttonColor = useBreakpointValue({ base: 'black', md: 'blue' });

    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const isActive = useMatch({ path: resolvedPath.pathname, end: true });

        return (
            <Link
                as={RouterLink}
                to={to}
                px={3}
                py={2}
                rounded="md"
                color={isActive ? "blue.400" : "white"}
                _hover={{ color: "blue.300" }}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <Box as="nav" bg={useColorModeValue("gray.800", "gray.900")} px={4} py="3px" position="fixed" width="100%" zIndex={10}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Text
                    as={RouterLink}
                    to="/"
                    fontSize="2xl"
                    fontWeight="bold"
                    color="white"
                    _hover={{ color: "blue.300" }}
                >
                    MentorMate
                </Text>

                <HStack spacing="8px" display={{ base: 'none', md: 'flex' }} alignItems="center">
                    <CustomLink to="/explore">
                        <Button colorScheme="white" size="md">Explore</Button>
                    </CustomLink>

                    <Link as={RouterLink} to="/account">
                        <Button colorScheme="white" size="md">Account</Button>
                    </Link>

                    <Button onClick={() => navigate('/login')} colorScheme="white" size="md">Login</Button>

                    <Link as={RouterLink} to="/signup">
                        <Button colorScheme={buttonColor} size="md">
                            Signup
                        </Button>
                    </Link>
                </HStack>

                <IconButton
                    aria-label="Toggle Navigation"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    onClick={() => setIsOpen(!isOpen)}
                    display={{ base: 'flex', md: 'none' }}
                />
            </Flex>

            <Collapse in={isOpen}>
                <Box
                    bg={useColorModeValue("gray.800", "gray.900")}
                    px={4}
                    py={2}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <HStack spacing={4} flexDirection="column" alignItems="start">
                        <CustomLink to="/explore">
                            <Button colorScheme="white" size="md">Explore</Button>
                        </CustomLink>

                        <Link as={RouterLink} to="/account">
                            <Button colorScheme="white" size="md">Account</Button>
                        </Link>

                        <Button onClick={() => navigate('/login')} colorScheme="white" size="md">Login</Button>

                        <Link as={RouterLink} to="/signup">
                            <Button colorScheme={buttonColor} size="md">
                                Signup
                            </Button>
                        </Link>
                    </HStack>
                </Box>
            </Collapse>
        </Box>
    );
}

export default Navbar;
