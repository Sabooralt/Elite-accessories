import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaRegStar } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import useVoteReview from "../hooks/useVoteReview";
import { useAuthContextProvider } from "../hooks/useAuthContext";
import { motion, AnimatePresence } from "framer-motion";
import NumberFormatter from "./NumberFormatter";

export const ReviewsCard = ({ review, product, reviewBy }) => {
  const { user } = useAuthContextProvider();
  const { voteReview, loading, error } = useVoteReview();

  const handleVote = (voteType) => {
    voteReview(review._id, voteType);
  };
  const getBackgroundColorUp = (review, userId) => {
    return review.downvotedBy.includes(userId) ? "buttonColor" : "#d93a00";
  };
  const getBackgroundColorDown = (review, userId) => {
    return review.upvotedBy.includes(userId) ? "buttonColor" : "#6A5CFF";
  };
  const backgroundColorUp = getBackgroundColorUp(review, user._id);
  const backgroundColorDown = getBackgroundColorDown(review, user._id);
  const isVoted =
    review.upvotedBy.includes(user._id) ||
    review.downvotedBy.includes(user._id);
  const isUpvoted = review.upvotedBy.includes(user._id);
  const isDownvoted = review.downvotedBy.includes(user._id);

  return (
    <>
      <GridItem
        sx={{
          padding: "1.25em 1.25em 0.7em 1.25em",
        }}
        height="fit-content"
        border="1px solid #000"
        borderRadius="27px"
        boxShadow="customShadow"
        bg="primaryGradient"
      >
        <HStack justifyContent="space-between">
          <HStack gap="1" color={"textC"}>
            <Avatar
              border="2px solid #000"
              boxShadow="circleShadow"
              size="md"
              name={reviewBy.fullName}
            ></Avatar>
            <Heading fontSize="large" fontWeight="600">
              {reviewBy.fullName}
            </Heading>
            <Box mb={'7px'}>

            <CommentSVG />
            </Box>
          </HStack>

          <HStack spacing="0">
            <StarRating rating={review.rating} />
          </HStack>
        </HStack>

        <HStack mt={2} spacing={2}>
          {review.tags ? review.tags.map((tag) => <Tag>{tag}</Tag>) : null}
        </HStack>

        <Box mt={1} ml={1} color={"textC"}>
          <Text>{review.body}</Text>
        </Box>

        <Box
          position={"relative"}
          bottom="0"
          mt="5"
          ml={1}
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Text m={0} color="GrayText">
            {formatDistanceToNow(new Date(review.createdAt), {
              addSuffix: true,
            })}
          </Text>

          <HStack
            overflow="hidden"
            position="relative"
            borderRadius="customB"
            color={!isVoted ? "#000" : "#fff"}
            bg={
              isUpvoted
                ? backgroundColorUp
                : isDownvoted
                ? backgroundColorDown
                : "buttonColor"
            }
            spacing={0.5}
            pr={3}
          >
            <IconButton
              onClick={() => handleVote("upvote")}
              _hover={{
                background: isUpvoted
                  ? "#962900"
                  : isDownvoted
                  ? "#453bb5"
                  : "#e2e7e9",
                color: !isVoted ? "#D93A00" : "",
              }}
              borderRadius="50%"
              p="3"
              minWidth="fit-content"
              variant="unstyled"
              icon={
                isUpvoted ? (
                  <ArrowRedditFilled />
                ) : (
                  <ArrowRedditUp fill={isVoted ? "#fff" : "#000"} />
                )
              }
            />
            <AnimatePresence mode="wait">
              <Text
                as={motion.p}
                key={review.upvotes}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.05 }}
                w="fit-content"
                sx={{
                  position: "relative",
                  overflow: "hidden",
                }}
                m={0}
              >
                <NumberFormatter value={review.upvotes} />
              </Text>
            </AnimatePresence>
            <IconButton
              onClick={() => handleVote("downvote")}
              _hover={{
                background: isUpvoted
                  ? "#962900"
                  : isDownvoted
                  ? "#453bb5"
                  : "#e2e7e9",
              }}
              sx={{
                transform: "rotate(180deg)",
              }}
              borderRadius="50%"
              p="3"
              minWidth="fit-content"
              variant="unstyled"
              icon={
                isDownvoted ? (
                  <ArrowRedditFilled />
                ) : (
                  <ArrowRedditUp fill={isVoted ? "#fff" : "#000"} />
                )
              }
            />
            <AnimatePresence mode="wait">
              <Text
                as={motion.p}
                m={0}
                key={review.downvotes}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.05 }}
                w="fit-content"
                sx={{
                  overflow: "hidden",
                }}
              >
                <NumberFormatter value={review.downvotes} />
              </Text>
            </AnimatePresence>
            {error && <p>Error: {error}</p>}
          </HStack>
        </Box>
      </GridItem>
    </>
  );
};

export const StarRating = ({ rating, size }) => {
  const stars = [];
  const MAX_STARS = 5;

  for (let i = 0; i < rating; i++) {
    stars.push(<FilledStar width={22} height={22} key={i} color="#ffc107" />);
  }

  const remainingStars = MAX_STARS - rating;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<UnFilledStar width={22} height={22} key={`empty-${i}`} />);
  }

  return <>{stars}</>;
};

export const FilledStar = ({ fill, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.06074 8.43387L12.19 2.13068C12.5916 1.32151 13.7522 1.32151 14.1538 2.13068L17.283 8.43387L24.2809 9.45087C25.1788 9.58135 25.5366 10.6787 24.8867 11.3082L19.8238 16.2111L21.0186 23.1376C21.1721 24.0272 20.2331 24.7054 19.4297 24.2853L13.1719 21.0133L6.9141 24.2853C6.11073 24.7054 5.17166 24.0272 5.32509 23.1376L6.5199 16.2111L1.4572 11.3082C0.807169 10.6787 1.16502 9.58135 2.06288 9.45087L9.06074 8.43387Z"
        fill="#EED91F"
        stroke="black"
        stroke-width="1.80703"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const UnFilledStar = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.58711 8.43375L12.7163 2.13056C13.118 1.32139 14.2786 1.32139 14.6802 2.13056L17.8094 8.43375L24.8073 9.45075C25.7052 9.58123 26.063 10.6786 25.413 11.3081L20.3502 16.211L21.545 23.1375C21.6985 24.0271 20.7594 24.7053 19.956 24.2852L13.6983 21.0132L7.44047 24.2852C6.6371 24.7053 5.69803 24.0271 5.85146 23.1375L7.04627 16.211L1.98356 11.3081C1.33354 10.6786 1.69139 9.58123 2.58924 9.45075L9.58711 8.43375Z"
        stroke="black"
        stroke-width="1.80703"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const CommentSVG = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84946 13.0864L9.66622 13.5026L8.84946 13.0864ZM9.65836 34.3416L10.3065 34.9898H10.3065L9.65836 34.3416ZM32.7469 29.6506L32.3308 28.8338L32.7469 29.6506ZM35.1505 27.247L34.3338 26.8308L34.3338 26.8308L35.1505 27.247ZM35.1505 13.0864L34.3338 13.5026L34.3338 13.5026L35.1505 13.0864ZM32.7469 10.6828L32.3308 11.4996L32.7469 10.6828ZM11.2531 10.6828L11.6692 11.4996L11.2531 10.6828ZM13.213 30.787L12.5648 30.1388L13.213 30.787ZM9.16667 18.8834C9.16667 17.3281 9.16738 16.2168 9.23856 15.3456C9.30886 14.4852 9.44331 13.9401 9.66622 13.5026L8.03271 12.6703C7.65616 13.4093 7.49088 14.2225 7.41131 15.1963C7.33262 16.1595 7.33333 17.3584 7.33333 18.8834H9.16667ZM9.16667 21.0833V18.8834H7.33333V21.0833H9.16667ZM7.33333 21.0833V30.25H9.16667V21.0833H7.33333ZM7.33333 30.25V30.25H9.16667V30.25H7.33333ZM7.33333 30.25V33.7583H9.16667V30.25H7.33333ZM7.33333 33.7583C7.33333 35.3099 9.20936 36.087 10.3065 34.9898L9.01018 33.6935C9.0155 33.6881 9.03488 33.6747 9.06258 33.6699C9.08527 33.666 9.10104 33.6698 9.11008 33.6736C9.11912 33.6773 9.13301 33.6857 9.14628 33.7046C9.16247 33.7275 9.16667 33.7508 9.16667 33.7583H7.33333ZM10.3065 34.9898L13.8612 31.4352L12.5648 30.1388L9.01018 33.6935L10.3065 34.9898ZM26.95 29.3334H14.5094V31.1667H26.95V29.3334ZM32.3308 28.8338C31.8933 29.0567 31.3482 29.1912 30.4877 29.2615C29.6166 29.3327 28.5053 29.3334 26.95 29.3334V31.1667C28.475 31.1667 29.6739 31.1674 30.637 31.0887C31.6109 31.0092 32.4241 30.8439 33.1631 30.4673L32.3308 28.8338ZM34.3338 26.8308C33.8944 27.6932 33.1932 28.3944 32.3308 28.8338L33.1631 30.4673C34.3705 29.8521 35.3521 28.8705 35.9673 27.6631L34.3338 26.8308ZM34.8333 21.45C34.8333 23.0053 34.8326 24.1166 34.7614 24.9878C34.6911 25.8482 34.5567 26.3933 34.3338 26.8308L35.9673 27.6631C36.3438 26.9241 36.5091 26.1109 36.5887 25.1371C36.6674 24.174 36.6667 22.9751 36.6667 21.45H34.8333ZM34.8333 18.8834V21.45H36.6667V18.8834H34.8333ZM34.3338 13.5026C34.5567 13.9401 34.6911 14.4852 34.7614 15.3456C34.8326 16.2168 34.8333 17.3281 34.8333 18.8834H36.6667C36.6667 17.3584 36.6674 16.1595 36.5887 15.1963C36.5091 14.2225 36.3438 13.4093 35.9673 12.6703L34.3338 13.5026ZM32.3308 11.4996C33.1932 11.939 33.8944 12.6402 34.3338 13.5026L35.9673 12.6703C35.3521 11.4629 34.3705 10.4813 33.1631 9.86608L32.3308 11.4996ZM26.95 11C28.5053 11 29.6166 11.0008 30.4877 11.0719C31.3482 11.1422 31.8933 11.2767 32.3308 11.4996L33.1631 9.86608C32.4241 9.48953 31.6109 9.32425 30.637 9.24468C29.6739 9.16599 28.475 9.16671 26.95 9.16671V11ZM17.05 11H26.95V9.16671H17.05V11ZM11.6692 11.4996C12.1067 11.2767 12.6518 11.1422 13.5123 11.0719C14.3834 11.0008 15.4947 11 17.05 11V9.16671C15.525 9.16671 14.3261 9.16599 13.363 9.24468C12.3891 9.32425 11.5759 9.48953 10.8369 9.86608L11.6692 11.4996ZM9.66622 13.5026C10.1056 12.6402 10.8068 11.939 11.6692 11.4996L10.8369 9.86608C9.62952 10.4813 8.6479 11.4629 8.03271 12.6703L9.66622 13.5026ZM13.8612 31.4352C14.0331 31.2633 14.2662 31.1667 14.5094 31.1667V29.3334C13.78 29.3334 13.0805 29.6231 12.5648 30.1388L13.8612 31.4352Z"
        fill="#222222"
      />
      <path
        d="M15.5835 17.4166H28.4168"
        stroke="#222222"
        stroke-width="1.83333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5835 22.9166L24.7502 22.9166"
        stroke="#222222"
        stroke-width="1.83333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const ArrowRedditUp = ({ fill }) => {
  return (
    <svg
      rpl=""
      fill={fill}
      height="16"
      icon-name="upvote-outline"
      viewBox="0 0 20 20"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path>{" "}
    </svg>
  );
};
export const ArrowRedditFilled = () => {
  return (
    <svg
      rpl=""
      fill="currentColor"
      height="16"
      icon-name="upvote-fill"
      viewBox="0 0 20 20"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.706 8.953 10.834.372A1.123 1.123 0 0 0 10 0a1.128 1.128 0 0 0-.833.368L1.29 8.957a1.249 1.249 0 0 0-.171 1.343 1.114 1.114 0 0 0 1.007.7H6v6.877A1.125 1.125 0 0 0 7.123 19h5.754A1.125 1.125 0 0 0 14 17.877V11h3.877a1.114 1.114 0 0 0 1.005-.7 1.251 1.251 0 0 0-.176-1.347Z"></path>
    </svg>
  );
};
