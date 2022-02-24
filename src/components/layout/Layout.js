import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router"
import Nav from "./Nav"

const Layout = (props) => {
    return <Box bgImage="url('sun-tornado.svg')" bgRepeat="no-repeat" bgSize="100%" minHeight="100vh">
        <Nav/>
        {props.children}
    </Box>
}

export default Layout