import { HStack, Heading } from '@chakra-ui/react';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function SignupSignInNavbar() {
   /*  const navItems = [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About Us",
          link: "/aboutus",
        },
        {
          name: "Reviews",
          link: "/reviews",
        },
        {
          name: "Help",
          link: "/help",
        },
      ]; */
  return (
    <nav
          style={{
            padding: 20,
            position: "absolute",
            top: 0,
            left: 0,
            background: "transparent",
            width: "100%",
            color: "#000",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Heading
            as={"h1"}
            textAlign={"justify"}
            fontWeight={600}
            color={"textC"}
          >
            Elite <br></br>
            Accessories
          </Heading>
          <HStack spacing={2}>
            <FontAwesomeIcon size="2xl" color="#000" icon={faFacebook} />
            <FontAwesomeIcon size="2xl" color="#000" icon={faInstagram} />
            <FontAwesomeIcon size="2xl" color="#000" icon={faWhatsapp} />
          </HStack>
        </nav>
  )
}
