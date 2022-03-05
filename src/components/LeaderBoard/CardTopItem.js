import { Avatar, Grid, ListItem } from "@chakra-ui/react";
import dinosaurs from "../../images/index.js";

const CardTopItem = ({ user }) => {
  const avatar = user.avatar.slice(9);
  const image = dinosaurs[+avatar - 1];
  return (
    <Grid
      as="ul"
      templateColumns={["20% 2fr 1fr 1fr", null, "25% 2fr 1fr 1fr"]}
      gap={2}
      listStyleType="none"
      pl={"8px"}
      alignItems="center"
    >
      <Avatar size="md" name={user.username} src={image} p="5px" />
      <ListItem>{user.username}</ListItem>
      <ListItem textAlign="center">{user.accuracy}</ListItem>
      <ListItem textAlign="center">{user.questionsTaken}</ListItem>
    </Grid>
  );
};

export default CardTopItem;
