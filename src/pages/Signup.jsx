import React from "react";
import { Grid, Box, Heading, VStack, HStack } from "@chakra-ui/react";
import { GlobalButton } from "../components/GlobalButton";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import SignupSignInNavbar from "../components/SignupSignInNavbar";
import PrivacyScreen from "../Animations/privacyScreen";

function Register() {
  return (
    <Grid templateColumns=".6fr 1fr" tem height={"100vh"} overflow={"hidden"}>
      <Box
        w={{ sm: "150%", lg: "100%", md: "fit-content", base: 300 }}
        borderRight={"3.5px solid"}
        pt={"7.5rem"}
        px={{ lg: "7rem", md: "6rem", sm: "2rem", base: "1rem" }}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        bg={"primaryLight"}
        color={"textC"}
        position={"relative"}
      >
        <SignupSignInNavbar />
        <Box>
          <Heading
            as={"h1"}
            fontSize={{ lg: "5rem", md: "3rem", sm: "3rem", base: "3rem" }}
          >
            Sign Up
          </Heading>
        </Box>

        <VStack mt={2} spacing={1}>
          <Heading
            fontSize={{
              lg: "1.1rem",
              md: "1.1rem",
              sm: "1.1rem",
              base: "0.8rem",
            }}
          >
            Already have an account?
          </Heading>
          <Link to="/login">
            <GlobalButton
              bg={"secondary"}
              fontSize={{
                lg: "large",
                md: "large",
                sm: "large",
                base: "medium",
              }}
              fontWeight={500}
              borderRadius={"customA"}
              px={10}
              py={"0 !important"}
            >
              Login
            </GlobalButton>
          </Link>
        </VStack>
        <Box w={"100%"}>
          <RegisterForm />
        </Box>

        <VStack mt={5} spacing={4}>
          <GlobalButton
            bg={"greyLight"}
            borderRadius={"customA"}
            pl={1}
            py={2}
            fontSize={"small"}
            leftIcon={
              <svg
                width="30"
                height="30"
                viewBox="0 0 39 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_181_1161)">
                  <path
                    d="M19.6956 15.447V22.7499H29.8441C29.3985 25.0985 28.0612 27.0871 26.0555 28.4242L32.1754 33.1728C35.7412 29.8815 37.7983 25.0472 37.7983 19.3044C37.7983 17.9672 37.6783 16.6814 37.4554 15.4472L19.6956 15.447Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.12741 22.4648L7.74712 23.5214L2.86133 27.3271C5.96418 33.4813 12.3237 37.7328 19.6951 37.7328C24.7864 37.7328 29.0549 36.0528 32.175 33.1729L26.055 28.4243C24.375 29.5557 22.2321 30.2415 19.6951 30.2415C14.7922 30.2415 10.6267 26.9329 9.13512 22.4757L9.12741 22.4648Z"
                    fill="#34A853"
                  />
                  <path
                    d="M2.86133 10.4242C1.57569 12.9612 0.838623 15.8241 0.838623 18.8755C0.838623 21.9269 1.57569 24.7898 2.86133 27.3268C2.86133 27.3439 9.13573 22.4583 9.13573 22.4583C8.75859 21.3268 8.53567 20.1269 8.53567 18.8753C8.53567 17.6237 8.75859 16.4238 9.13573 15.2924L2.86133 10.4242Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M19.6955 7.52712C22.4726 7.52712 24.9412 8.48709 26.9126 10.3385L32.3125 4.93862C29.0383 1.88724 24.787 0.0185547 19.6955 0.0185547C12.3241 0.0185547 5.96418 4.25283 2.86133 10.4243L9.13553 15.2929C10.6269 10.8357 14.7926 7.52712 19.6955 7.52712Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_181_1161">
                    <rect
                      width="37.7143"
                      height="37.7143"
                      fill="white"
                      transform="translate(0.838623 0.0185547)"
                    />
                  </clipPath>
                </defs>
              </svg>
            }
          >
            Sign Up With Google
          </GlobalButton>
          <GlobalButton
            fontSize={"0.76rem"}
            bg={"greyLight"}
            borderRadius={"customA"}
            pl={1}
            pr={1}
            py={2}
            leftIcon={
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_181_1163)">
                  <path
                    d="M39.3726 20.0249C39.3726 9.15769 30.5628 0.3479 19.6956 0.3479C8.82835 0.3479 0.0185547 9.15769 0.0185547 20.0249C0.0185547 29.2527 6.37187 36.996 14.9424 39.1226V26.0382H10.885V20.0249H14.9424V17.4338C14.9424 10.7366 17.9734 7.63233 24.5487 7.63233C25.7955 7.63233 27.9465 7.87712 28.8265 8.12111V13.5716C28.3621 13.5228 27.5554 13.4984 26.5534 13.4984C23.3272 13.4984 22.0804 14.7208 22.0804 17.8982V20.0249H28.5077L27.4035 26.0382H22.0804V39.5579C31.8237 38.3812 39.3734 30.0854 39.3734 20.0249H39.3726Z"
                    fill="#0866FF"
                  />
                  <path
                    d="M27.4025 26.0382L28.5068 20.0249H22.0795V17.8982C22.0795 14.7208 23.3262 13.4984 26.5524 13.4984C27.5544 13.4984 28.3612 13.5228 28.8255 13.5716V8.1211C27.9456 7.87632 25.7945 7.63232 24.5478 7.63232C17.9725 7.63232 14.9414 10.7366 14.9414 17.4338V20.0249H10.884V26.0382H14.9414V39.1226C16.4636 39.5004 18.0559 39.7019 19.6946 39.7019C20.5014 39.7019 21.2971 39.6523 22.0787 39.5579V26.0382H27.4017H27.4025Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_181_1163">
                    <rect
                      width="39.354"
                      height="39.354"
                      fill="white"
                      transform="translate(0.0185547 0.3479)"
                    />
                  </clipPath>
                </defs>
              </svg>
            }
          >
            Sign Up With Facebook
          </GlobalButton>
        </VStack>
      </Box>

      <Box w={"100%"} bg={"transparent"} p={3}></Box>
    </Grid>
  );
}
export default PrivacyScreen(Register);
