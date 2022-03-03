import { Link as ReactRouterLink} from "react-router-dom"

import { Flex, IconButton, Spacer, Link, Text } from "@chakra-ui/react"
import {FaUser} from 'react-icons/fa'

const Nav = () => {
    return (
        <Flex align="center" justify="space-between" mb={8} p={8} h="100%" bg="rgba(0, 0, 0, .5)">
            <Link to="/" as={ReactRouterLink}>
                <Text display="inline" fontSize="2em" fontWeight="light">Trivia</Text>
                <Text display="inline" color="gold" fontSize="2em" fontWeight="bold">Chomp</Text>
            </Link>
            <Spacer />
            <Link to="/" as={ReactRouterLink} pr={2}>Leaderboards</Link>
            <Link to="/quiz" as={ReactRouterLink} pr={2}>Quizzes</Link>
            <Link to="/profile" as={ReactRouterLink} pr={2}>
                <IconButton icon={<FaUser size='44px'/>} variant="link" size='lg'></IconButton>
            </Link>
        </Flex>
    )
}

export default Nav;