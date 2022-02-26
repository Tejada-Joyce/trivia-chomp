import {
  FormControl,
  FormLabel,
  Input,
  Divider,
  Button,
  useRadioGroup,
  Grid,
  useToast,
} from "@chakra-ui/react";
import AvatarCard from "./AvatarCard";
import dinosaurs from "../../images/index.js";
import { useState } from "react";

const ProfileForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const toast = useToast();

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const avatarChangeHandler = (e) => {
    setSelectedOption(e.target.value);
    console.log(e.target.value);
    setAvatar(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(username, avatar);
    onClose();
    toast({
      title: "Profile set successfully!",
      status: "success",
      position: "top-right",
      duration: "3000",
      isClosable: true,
    });
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "dinosaur",
  });

  const group = getRootProps();

  return (
    <form onSubmit={submitHandler}>
      <FormControl isRequired>
        <FormLabel htmlFor="username" fontSize="md" textAlign="center">
          Username
        </FormLabel>
        <Input
          id="username"
          placeholder="BestPlayer01"
          textAlign="center"
          value={username}
          onChange={usernameChangeHandler}
        />
        <Divider height="1.5rem" borderColor="transparent" />
        <FormLabel htmlFor="avatar" fontSize="md" textAlign="center">
          Pick Your Avatar
        </FormLabel>
        <Grid
          {...group}
          name="dinosaur"
          defaultValue={avatar}
          templateColumns={["repeat(3, 1fr)", "repeat(4, 1fr)"]}
          gap={[3, 4]}
        >
          {dinosaurs.map((value, index) => {
            const radio = getRadioProps({ value });
            radio.value = `dinosaur_${index + 1}`;
            radio.isChecked = selectedOption === radio.value;
            radio.onChange = (e) => {
              avatarChangeHandler(e);
            };
            return (
              <AvatarCard key={`dinosaur_${index + 1}`} {...radio}>
                {value}
              </AvatarCard>
            );
          })}
        </Grid>
        <Divider height="1.5rem" borderColor="transparent" />
        <Button type="submit" colorScheme="blue" width="100%">
          Save
        </Button>
      </FormControl>
    </form>
  );
};

export default ProfileForm;
