import { Box, Center, Heading } from "@chakra-ui/react";

export default function CheadingComponent({children}) {
  return (
    <Box p={2}>
        <Center>
          <Box
            color={"textC"}
            bg={"primary"}
            textAlign={"center"}
            px={10}
            py={1}
            border={"1px solid #000"}
            shadow={"customShadow"}
            borderRadius={15}
          >
            <Heading as={"h1"}>{children}</Heading>
          </Box>
        </Center>
        
      </Box>
  )
}
