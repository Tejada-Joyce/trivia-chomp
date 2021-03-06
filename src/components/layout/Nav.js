import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-contex";

import { Flex, Spacer, Link, Text, Avatar } from "@chakra-ui/react";
import dinosaurs from "../../images/index";

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

  //get avatar
  const avatar = authCtx?.avatar.slice(9);
  const image = dinosaurs[+avatar - 1];

  return (
    <Flex
      align="center"
      justify="space-between"
      mb={8}
      p="10px 20px"
      h="100%"
      bg="rgba(0, 0, 0, .5)"
    >
      <Link to={isLoggedIn ? "/" : "auth"} as={ReactRouterLink} _hover={{textDecoration: 'none'}}>
        <Text display="inline" fontSize="2em" fontWeight="light">
          Trivia
        </Text>
        <Text display="inline" color="gold" fontSize="2em" fontWeight="bold">
          Chomp
        </Text>
      </Link>

      <Spacer />

      {isLoggedIn && (
        <Flex flexDirection="column" alignItems="center">
          <Link to="/profile" as={ReactRouterLink} pr={2}>
            <Avatar src={image}></Avatar>
          </Link>

          <button onClick={logoutHandler}>
            Logout <i className={"fa-solid fa-right-from-bracket"}></i>
          </button>
        </Flex>
      )}
    </Flex>
  );
};

export default Nav;
