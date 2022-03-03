import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Nav from "./Nav";

const Layout = () => {
  return (
    <Box
      bgImage="url('sun-tornado.svg')"
      bgRepeat="no-repeat"
      minHeight="100vh"
      h="100%"
      backgroundSize="cover" >
      <Nav />
      <Outlet />
    </Box>
  );
};

export default Layout;
