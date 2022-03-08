import {
  FormControl,
  FormLabel,
  Input,
  Divider,
  Button,
  useRadioGroup,
  Grid,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import AvatarCard from "./AvatarRadioButton";
import dinosaurs from "../../images/index.js";
import { useEffect, useState, useContext } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-contex";

const ProfileForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "dinosaur",
  });
  const group = getRootProps();
  const toast = useToast();

  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const { isLoading, error, sendRequest: submitProfileData } = useHttp();
  const usersDataUrl = `https://trivia-chomp-c5a02-default-rtdb.firebaseio.com/users/${userId}.json`;

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const avatarChangeHandler = (e) => {
    setSelectedOption(e.target.value);
    setAvatar(e.target.value);
  };

  const addDataContext = () => {
    onClose();
    toast({
      title: "Profile set successfully!",
      status: "success",
      position: "top-right",
      duration: "3000",
      isClosable: true,
    });
    authCtx.updateUserData({
      avatar: avatar,
      username: username,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      username: username,
      avatar: avatar,
    };
    await submitProfileData(
      {
        url: usersDataUrl,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      },
      addDataContext.bind()
    );
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong. Please, try again",
        status: "error",
        position: "top-right",
        duration: "3000",
        isClosable: true,
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return <Spinner size="xl" textAlign="center" />;
  }

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
