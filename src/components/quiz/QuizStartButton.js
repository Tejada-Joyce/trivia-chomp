import { Button } from "@chakra-ui/react"

export default function QuizStartButton(props) {


    return <Button
        bg="gold"
        color="indigo"
        margin="40px auto 20px"
        w="150px"
        h="50px"
        display="block"
        onClick={props.onClick}
    >Take a Quiz</Button>
}