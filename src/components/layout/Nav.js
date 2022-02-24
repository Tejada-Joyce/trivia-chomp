import { Link as ReactRouterLink} from "react-router-dom"

import { Flex, IconButton, Spacer, Link } from "@chakra-ui/react"
import {FaUser} from 'react-icons/fa'

const Nav = () => {
    return (
        <Flex align="center" justify="space-between" mb={8} p={8} w="100%" bg="rgba(0, 0, 0, .5)">
            <Link to="/" as={ReactRouterLink}>Logo</Link>
            <Spacer />
            <Link to="/" as={ReactRouterLink} pr={2}>Leaderboard</Link>
            <Link to="/quiz" as={ReactRouterLink} pr={2}>Quizzes</Link>
            <Link to="/profile" as={ReactRouterLink} pr={2}>
                <IconButton icon={<FaUser size='44px'/>} variant="link" size='lg'></IconButton>
            </Link>
        </Flex>
    )
}

export default Nav;