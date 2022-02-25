import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const ProfileForm = () => {
  return (
    <FormControl>
      <FormLabel htmlFor="username" fontSize="md" textAlign="center">
        Username
      </FormLabel>
      <Input id="username" placeholder="BestPlayer01" textAlign="center" />
      <FormLabel htmlFor="avatar" fontSize="md" textAlign="center">
        Pick Your Avatar
      </FormLabel>
    </FormControl>
  );
};

export default ProfileForm;
