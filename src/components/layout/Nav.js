import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-contex";

import { Flex, IconButton, Spacer, Link, Text } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const Nav = () => {
    //Authentication
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const navigate = useNavigate();

    //Logout the user
    const logoutHandler = () => {
        authCtx.logout();
        navigate("/auth");
    };

    return (
        <Flex
            align="center"
            justify="space-between"
            mb={8}
            p="10px 20px"
            h="100%"
            bg="rgba(0, 0, 0, .5)"
        >

            <Link to={isLoggedIn ? '/' : 'auth'} as={ReactRouterLink}>
                <Text display="inline" fontSize="2em" fontWeight="light">
                    Trivia
                </Text>
                <Text display="inline" color="gold" fontSize="2em" fontWeight="bold">
                    Chomp
                </Text>
            </Link>

            <Spacer />


            <Flex flexDirection="column" alignItems="center">
                <Link to={isLoggedIn ? '/profile' : '/auth'} as={ReactRouterLink} pr={2}>
                    <IconButton
                        icon={<FaUser size="30px" />}
                        variant="link"
                        size="lg"
                    ></IconButton>

                </Link>
                {isLoggedIn && (
                    <button onClick={logoutHandler}>Logout <i className={'fa-solid fa-right-from-bracket'}></i></button>
                )}
            </Flex>

        </Flex>
    );
};

export default Nav;
