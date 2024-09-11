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
  Divider,
  FormControl,
  FormLabel,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  DrawerCloseButton,
  Input,
} from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import React, { useRef } from "react";
import { EditPackageTypes } from "../../interfaces";
import { queryClient } from "../../pages/_app";
import { updateCompany } from "../../endpoints";

function EditCompany({ isOpen, onOpen, onClose, row }: EditPackageTypes) {
  //   const { isOpen, onOpen, onClose } = useDisclosure();

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

  const updateThisRow = async () => {
    setLoading.on();
    // console.log("row ----->", row);
    const result = await updateCompany({
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
      id: row.id,
    });
    setLoading.off();
    onClose();
    toast({
      title: result.message,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    return queryClient.invalidateQueries({ queryKey: ["companies"] });
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <FaArrowLeftLong onClick={onClose} />
              <Text>Edit Company</Text>
            </Flex>
          </DrawerHeader>

          <Divider w={"90%"} margin={"auto"} />

          <DrawerBody>
            <FormControl mb={5}>
              <FormLabel color={"#c6c6c6"}>Company Name*</FormLabel>
              <Input
                ref={companyNameRef}
                type="text"
                defaultValue={row.companyName}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel color={"#c6c6c6"}>Phone*</FormLabel>
              <Input ref={phoneRef} type="tell" defaultValue={row.phone} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel color={"#c6c6c6"}>Address*</FormLabel>
              <Input ref={addressRef} type="text" defaultValue={row.address} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel color={"#c6c6c6"}>Country*</FormLabel>
              <Input ref={countryRef} type="text" defaultValue={row.country} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel color={"#c6c6c6"}>Name*</FormLabel>
              <Input ref={nameRef} type="text" defaultValue={row.name} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel color={"#c6c6c6"}>Email*</FormLabel>
              <Input ref={emailRef} type="email" defaultValue={row.email} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel color={"#c6c6c6"}>Password*</FormLabel>
              <Input
                ref={passwordRef}
                type="password"
                defaultValue={row.password}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl mb={5}>
              <FormLabel color={"#c6c6c6"}>Package*</FormLabel>
              <Input ref={packageRef} type="text" defaultValue={row.packagee} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </DrawerBody>

          <DrawerFooter justifyContent={"center"} gap={2}>
            <Button
              borderRadius={6}
              colorScheme="purple"
              onClick={updateThisRow}
            >
              Update
            </Button>
            <Button borderRadius={6} variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default EditCompany;
