import { Select, FormControl, FormLabel, Divider, Button, } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function QuizSetupForm() {
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        let chosenCategory = e.target.elements.category.value
        navigate(`/quiz/${chosenCategory}`)

    }
    return <form onSubmit={submitHandler}>
        <FormControl isRequired>
            <FormLabel htmlFor="category" fontSize="md" textAlign="center">
                Choose A Category:
            </FormLabel>
            <Select
                id="category"
                textAlign="center"
                defaultValue="random"
            >
                <option value="random">Random</option>
                <option value="27">Animals</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="10">Entertainment: Books</option>
                <option value="32">Entertainment: Cartoon and Animations</option>
                <option value="29">Entertainment: Comics</option>
                <option value="11">Entertainment: Film</option>
                <option value="31">Entertainment: Japanese Anime and Manga</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals and Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="9">General Knowledge</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="20">Mythology</option>
                <option value="24">Politics</option>
                <option value="18">Science: Computers</option>
                <option value="30">Science: Gadgets</option>
                <option value="19">Science: Mathematics</option>
                <option value="17">Science: Nature</option>
                <option value="21">Sports</option>
                <option value="28">Vehicles</option>
                
            </Select>
            <Divider height="1.5rem" borderColor="transparent" />
            <Button type="submit" background="gold" color="indigo" width="100%" _hover={{ backgroundColor: '#ddb902'}}>
                Go
            </Button>
        </FormControl>
    </form>
}