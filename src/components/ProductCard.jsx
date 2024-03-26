import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { GlobalButton } from "./GlobalButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { PiShoppingCartLight } from "react-icons/pi";

export default function ProductCard({ children,prize }) {
  return (
    <Card maxW={"fit-content"}>
      <CardBody p={0}>
        <Image
          src="/products/me.jpeg"
          height={"280px"}
          objectFit={'cover'}
          w={344}
          boxShadow={"cardShadow"}
          border={"1px solid #000"}
          outline={"none"}
          alt="Green double couch with wooden legs"
          borderRadius="15"
        />

        <CardFooter px={0}>
            <VStack>

          <GlobalButton
          py={1.5}
          px={0.5}
          display={'flex'}
          flexDirection={'column'}
            w={"100%"}
            height="100%"
            textTransform={"capitalize"}
            fontWeight={"regular"}
            borderRadius={12}
            bg={"primary"}
            fontSize={"1.7rem"}
          >
            {children}
             <br />
            <Heading as={"h5"} fontSize={'5l'} textTransform={"uppercase"}>
              PKR {prize}
            </Heading>
          </GlobalButton>
<GlobalButton mt={2} bg={'secondary'} p={5} rightIcon={<PiShoppingCartLight size={23}/>}>
    Add To Cart

</GlobalButton>

</VStack>

        </CardFooter>
      </CardBody>
    </Card>
  );
}
