import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from "@chakra-ui/react";
import PickRating from "./PickRating";
import { useAddReview } from "../hooks/useAddReview";

const tags = [
  "Long-lasting",
  "Durable",
  "Stylish",
  "Affordable",
  "Reliable",
  "Protective",
  "Trendy",
  "Budget-friendly",
  "Excellent",
  "Great",
  "Unique",
  "Average",
  "Overpriced",
  "Poor quality",
  "Not worth it",
];

const ReviewModal = ({ isOpen, onClose, title, productId }) => {
  const toast = useToast();
  const [review, setReview] = useState();
  const [rating, setRating] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const { addreview, isLoading, responseG, error } = useAddReview();

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitButton = () => {
    if (review === "" || rating === null) {
      return true;
    }
  };

  const handleAddReview = async () => {
    addreview({
      productId: productId,
      body: review,
      rating: rating,
      tags: selectedTags,
    });
  };

  useEffect(() => {
    if (responseG) {
      toast({
        title: responseG.type,
        status: responseG.type,
        description: responseG.message,
        duration: 5000,
        isClosable: true,
      });
      if(responseG.type === "success"){
        onClose();
        setReview("");
        setRating(null);
        setSelectedTags([])
      }
    }
  },[responseG]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='scale'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Review:</FormLabel>
            <Input
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Your comment"
            />
          </FormControl>
          <FormControl mt={4}>
            <HStack spacing={2} wrap="wrap">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  size="md"
                  variant={selectedTags.includes(tag) ? "solid" : "outline"}
                  colorScheme="teal"
                  cursor="pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  <TagLabel>{tag}</TagLabel>
                  {selectedTags.includes(tag) && (
                    <TagCloseButton onClick={() => handleTagClick(tag)} />
                  )}
                </Tag>
              ))}
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <p>Please rate your experience with the product </p>
            <PickRating value={rating} onChange={handleRatingChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={handleSubmitButton()}
            colorScheme="blue"
            mr={3}
            onClick={handleAddReview}
          >
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
