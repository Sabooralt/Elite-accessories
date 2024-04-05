import { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";

const Rating = ({ value, onChange }) => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const labels = {
    1: "Very Poor💩",
    2: "Poor😶",
    3: "Fair🙄",
    4: "Good🙂‍",
    5: "Very Good🤩",
  };

  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((index) => (
        <Tooltip key={index} label={labels[index]} placement="top">
          <IconButton
            icon={<StarIcon color={index <= (hoveredValue || value) ? "yellow.400" : "gray.200"} />}
            onClick={() => onChange(index)}
            onMouseEnter={() => setHoveredValue(index)}
            onMouseLeave={() => setHoveredValue(null)}
            aria-label={`Rate ${index}`}
            variant="unstyled"
            _hover={{ cursor: "pointer" }}
          />
        </Tooltip>
      ))}
    </Flex>
  );
};

export default Rating;
