import { FormControl, FormLabel, Input, Divider } from "@chakra-ui/react";

const ProfileForm = () => {
  return (
    <FormControl>
      <FormLabel htmlFor="username" fontSize="md" textAlign="center">
        Username
      </FormLabel>
      <Input id="username" placeholder="BestPlayer01" textAlign="center" />
      <Divider height="1.5rem" borderColor="transparent" />
      <FormLabel htmlFor="avatar" fontSize="md" textAlign="center">
        Pick Your Avatar
      </FormLabel>
    </FormControl>
  );
};

export default ProfileForm;
