import { Box } from "@chakra-ui/react"

const Background = (props) => {
    return <Box p={8} bg="rgba(0, 0, 0, .75)" maxW="900px" m="10px auto" >{props.children}</Box>
}  
export default Background