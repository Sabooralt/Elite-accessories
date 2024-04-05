import { Icon} from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Heading,
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  AvatarBadge,
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
import { useCartContext } from "../hooks/useCartContext";
import { FiEdit2, FiEye, FiShoppingCart } from "react-icons/fi";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Header() {
  const { user } = useAuthContextProvider();
  const { items } = useCartContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
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
              <SearchIcon/>
            </InputLeftAddon>
            <Input
              fontSize={"x-large"}
              fontWeight={600}
              height={12}
              variant="unstyled"
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
              <Menu>
                <MenuButton
                  cursor={"pointer"}
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
          {items && (
            <Link to="/MyCart" cursor="pointer">
              <Icon size="2xl" color="#AFEE1F" as={cart} />
              <Heading className="text-white">{items.length}</Heading>
            </Link>
          )}
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
    {
      name: "Product",
      link: "/product"
    }
  ];

  const location = useLocation();
  return (
    <Flex justify={"flex-end"} gap={2} mt={5} px={5}>
      {navItems.map((item, index) => (
        <NavLink to={item.link} key={index}>
          <GlobalButton
            color="textC"
            _hover={{
              boxShadow: "customShadow",
            }}
            boxShadow="0"
            bg={"primary"}
            fontWeight={600}
            fontSize={"1.3rem"}
          >
            {item.name}
          </GlobalButton>
        </NavLink>
      ))}
    </Flex>
  );
};
export const SearchIcon = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.125"
        cy="15.125"
        r="9.625"
        stroke="#33363F"
        stroke-width="2.75"
      />
      <path
        d="M27.5 27.5L23.375 23.375"
        stroke="#33363F"
        stroke-width="2.75"
        stroke-linecap="round"
      />
    </svg>
  );
};

export const cart = () => {
  return (
    <svg
      width="32"
      height="35"
      viewBox="0 0 44 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.27783 2.22678H6.02747C7.70134 2.22678 8.53827 2.22678 9.16836 2.68092C9.79845 3.13506 10.0631 3.92905 10.5924 5.51702L11.9016 9.44463"
        stroke="#B2FF00"
        stroke-width="2.40595"
        stroke-linecap="round"
      />
      <path
        d="M35.9613 33.5041H13.2273C12.8755 33.5041 12.6997 33.5041 12.5662 33.4892C11.1525 33.3309 10.1841 31.9873 10.481 30.5961C10.509 30.4647 10.5646 30.2979 10.6758 29.9642V29.9642C10.7993 29.5937 10.8611 29.4085 10.9293 29.245C11.6277 27.5714 13.2077 26.4326 15.0163 26.2993C15.1929 26.2863 15.3882 26.2863 15.7787 26.2863H28.7435"
        stroke="#B2FF00"
        stroke-width="2.40595"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.9704 26.2863H20.6536C17.5759 26.2863 16.037 26.2863 14.8317 25.4915C13.6265 24.6968 13.0203 23.2824 11.8079 20.4535L11.4017 19.5057C9.45414 14.9613 8.48034 12.6891 9.55004 11.0669C10.6197 9.44461 13.0918 9.44461 18.036 9.44461H30.7415C36.2729 9.44461 39.0386 9.44461 40.0817 11.2421C41.1248 13.0396 39.7527 15.4409 37.0083 20.2435L36.3262 21.4372C34.9742 23.8032 34.2982 24.9862 33.1781 25.6362C32.058 26.2863 30.6954 26.2863 27.9704 26.2863Z"
        stroke="#B2FF00"
        stroke-width="2.40595"
        stroke-linecap="round"
      />
      <circle cx="34.7582" cy="39.519" r="2.40595" fill="#B2FF00" />
      <circle cx="15.5107" cy="39.519" r="2.40595" fill="#B2FF00" />
    </svg>
  );
};
