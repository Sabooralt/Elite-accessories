import { Box, Grid, Heading } from "@chakra-ui/react";
import { ReviewsCard } from "../components/ReviewsCard";
import { useReviewContext } from "../hooks/useReviewContext";

export default function Reviews() {
  const { state } = useReviewContext();
  const {reviews} = state;
  console.log("reviews:", reviews);
  return (
    <>
      <Box w="100%" p={10}>
        <Grid templateColumns="repeat(2,1fr)" gap={4}>
          {reviews ?
            reviews.map(({ review , user , product}) => (
              <>
              <ReviewsCard review={review} reviewBy={user} product={product}/>
              </>
            )): <Heading>No Reviews rn/</Heading>}
        </Grid>
      </Box>
    </>
  );
}
