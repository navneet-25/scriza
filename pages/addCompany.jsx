import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Divider,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

import { insertCompany } from "../endpoints";
import { Link } from "@chakra-ui/next-js";
import { useRef } from "react";

const Companies = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoadind, setLoading] = useBoolean();

  const toast = useToast();

  const companyNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const countryRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const packageRef = useRef(null);

  return (
    <Box
      ml={{ base: 0, md: 60 }}
      padding={6}
      borderRadius={10}
      background={"#fff"}
    >
      <HStack fontSize={12} fontWeight={"600"} color={"purple"}>
        <Link href={"/"}>Home</Link>
        <Text>{">"}</Text>
        <Link href={"/companies"}>Companies</Link>
        <Text>{">"}</Text>
        <Link href={"/"}>Add Companies</Link>
      </HStack>

      <Box my={5}>
        <Text fontWeight={"700"} color={"#000"} fontSize={20}>
          Add Company
        </Text>
      </Box>

      <Divider margin={"auto"} />
      <Box mb={6}></Box>

      <SimpleGrid columns={[1, 1, 2]} spacing="20px">
        <FormControl>
          <FormLabel>Company Name</FormLabel>
          <Input ref={companyNameRef} type="text" />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input ref={phoneRef} type="tell" />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input ref={addressRef} type="text" />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input ref={countryRef} type="text" />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input ref={nameRef} type="text" />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input ref={emailRef} type="email" />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input ref={passwordRef} type="password" />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel>Package</FormLabel>
          <Input ref={packageRef} type="text" />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </SimpleGrid>
      <HStack justifyContent={"center"} marginTop={10}>
        <Button
          colorScheme="purple"
          borderRadius={6}
          isLoading={isLoadind}
          onClick={async () => {
            setLoading.on();
            await insertCompany({
              companyName: companyNameRef.current.value,
              createdOn: +new Date(),
              login: 1,
              packagee: packageRef.current.value,
              address: addressRef.current.value,
              country: countryRef.current.value,
              email: emailRef.current.value,
              name: nameRef.current.value,
              password: passwordRef.current.value,
              phone: phoneRef.current.value,
              status: 1,
            });
            setLoading.off();
            toast({
              title: "Record inserted successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }}
        >
          Add
        </Button>
        <Button colorScheme="purple" borderRadius={6} variant="outline">
          Button
        </Button>
      </HStack>
    </Box>
  );
};

export default Companies;
