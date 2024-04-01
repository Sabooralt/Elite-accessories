import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Heading,
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
  Button,
  Spacer,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  faFacebook,
  faInstagram,
  faSearchengin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Link, NavLink, useLocation } from "react-router-dom";
import { GlobalButton } from "./GlobalButton";
import { useAuthContextProvider } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Header() {
  const { user } = useAuthContextProvider();
  const {logout} = useLogout();

  const handleLogout = ()=>{
    logout();
  }
  return (
    <div>
      <Flex
        w="100%"
        bg={"brand"}
        justify={"space-between"}
        alignItems={"center"}
        px={5}
        py={5}
        gap={5}
        wrap={"wrap"}
      >
        <Box as="div">
          <Heading as={"h3"} color={"primary"}>
            Elite Accessories
          </Heading>
        </Box>

        <Box flexGrow={1}>
          <InputGroup
            bg={"#D9D9D9"}
            borderRadius={30}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <InputLeftAddon bg={"transparent"} border={0}>
              <FontAwesomeIcon />
            </InputLeftAddon>
            <Input
              fontSize={"x-large"}
              fontWeight={600}
              height={12}
              variant="outline"
              textAlign={"center"}
              placeholder="Elite Accessories"
              border={0}
              borderRadius={30}
            />
          </InputGroup>
        </Box>
        {user && (
          <Wrap>
            <WrapItem>
              <Text className="text-white">{user.fullName}</Text>
            </WrapItem>
            <WrapItem>
              {" "}
              <Menu>
                <MenuButton
                 cursor={'pointer'}
                  as={Avatar}
                  bg={"red.500"}
                  size="md"
                  name={user.fullName}
                >
                  {/* You can add any content inside the Avatar component if you wish */}
                </MenuButton>
                <MenuList>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </WrapItem>
          </Wrap>
        )}

        <HStack spacing={5} height={"fit-content"} p={5}>
          <FontAwesomeIcon size="2xl" color="#AFEE1F" icon={faFacebook} />
          <FontAwesomeIcon size="2xl" color="#AFEE1F" icon={faInstagram} />
          <FontAwesomeIcon size="2xl" color="#AFEE1F" icon={faWhatsapp} />
          {!user && (
            <Link to="/login">
              <div>
                <GlobalButton color={"textC"} bg={"secondary"}>
                  Login/SignUp
                </GlobalButton>
              </div>
            </Link>
          )}
        </HStack>
      </Flex>

      <NavLinks />
    </div>
  );
}

export const NavLinks = () => {
  const navItems = [
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
    {
      name: "admin",
      link: "/admin",
    },
  ];

  const location = useLocation();
  return (
    <Flex justify={"flex-end"} gap={2} mt={5} px={5}>
      {navItems.map((item, index) => (
        <NavLink to={item.link} key={index}>
          <GlobalButton
            color="textC"
            bg={"primary"}
            fontWeight={700}
            fontSize={"1.3rem"}
          >
            {item.name}
          </GlobalButton>
        </NavLink>
      ))}
    </Flex>
  );
};
