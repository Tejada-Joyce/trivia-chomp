import {
  Heading,
  OrderedList,
  ListItem,
  Grid,
  Divider,
} from "@chakra-ui/react";
import CardTopItem from "./CardTopItem.js";

const CardTop = ({ time, users }) => {
  const labels = ["User", "ACC", "TQ"];
  return (
    <>
      <Heading as="h2" size="lg">
        {time}'s Top
      </Heading>
      <Divider height="1.5rem" borderColor="transparent" />
      <Grid
        templateColumns={["60% 1fr 1fr", null, "63% 1fr 1fr"]}
        textAlign={"center"}
        alignItems={"center"}
      >
        {labels.map((label, index) => (
          <Heading as="h4" size="md" key={index}>
            {label}
          </Heading>
        ))}
      </Grid>
      <OrderedList
        maxW={["100%", "100%", "280px"]}
        m={"20px 5px 10px 20px"}
        spacing={4}
      >
        {users.map((user) => (
          <ListItem key={user.id}>
            <CardTopItem user={user} />
          </ListItem>
        ))}
      </OrderedList>
    </>
  );
};

export default CardTop;
