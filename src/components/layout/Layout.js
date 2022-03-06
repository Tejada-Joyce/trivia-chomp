import { Box } from "@chakra-ui/react";
import Nav from "./Nav";

const Layout = (props) => {
  return (
    <Box
      bgImage="url('sun-tornado.svg')"
      bgRepeat="no-repeat"
      minHeight="100vh"
      h="100%"
      backgroundSize="cover"
    >
      <Nav />
      <main>{props.children}</main>
      <footer>
        <a
          href="https://www.flaticon.com/free-icons/dinosaur"
          title="dinosaur icons"
        >
          Dinosaur icons created by Freepik - Flaticon
        </a>
      </footer>
    </Box>
  );
};

export default Layout;
