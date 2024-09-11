import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  BoxProps,
  HStack,
  VStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

// assets\backgrounds\abstract1.svg

interface StatsCardType {
  props?: BoxProps;
  title: string;
  count: number;
  icon: IconType;
  bg: string;
}

export default function StatsCard({
  props,
  title,
  count,
  icon,
  bg,
}: StatsCardType) {
  return (
    <Box
      //   maxW={"320px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
      display={"flex"}
      margin={"auto"}
      justifyContent={"space-between"}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // width: "100%",
        // height: "100%",
      }}
      color={"#fff"}
      {...props}
    >
      <VStack alignItems={"baseline"} justifyContent={"space-around"}>
        <Box fontWeight={600}>{title}</Box>
        <Box fontSize={20} fontWeight={"800"}>
          {count}
        </Box>
      </VStack>
      <VStack alignItems={"end"}>
        <Box>
          <Icon
            // mr="4"
            fontSize="30"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        </Box>
        <Flex alignItems={"center"} gap={2} fontSize={12}>
          View More <FaRegArrowAltCircleRight size={20} />{" "}
        </Flex>
      </VStack>
    </Box>
  );
}
