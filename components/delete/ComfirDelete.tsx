import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Flex,
  Text,
  HStack,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { EditPackageTypes } from "../../interfaces";
import { deleteCompanies } from "../../endpoints";
import { queryClient } from "../../pages/_app";

export default function DeleteModal({
  isOpen,
  onOpen,
  onClose,
  row,
}: EditPackageTypes) {
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoadind, setLoading] = useBoolean();
  const toast = useToast();

  const deleteThisRow = async ({ row }) => {
    setLoading.on();
    // console.log("row ----->", row);
    await deleteCompanies({ row });
    setLoading.off();
    onClose();
    toast({
      title: "Record deleted successfully",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return queryClient.invalidateQueries({ queryKey: ["companies"] });
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box mt={16} mb={6}>
              <Flex justifyContent={"center"}>
                <MdDeleteForever size={100} />
              </Flex>
              <Box mt={6} textAlign={"center"}>
                <Text fontWeight={"700"}>Comfirmation</Text>
                <Text fontSize={14} mt={2}>
                  Are you sure to delete this Company ? {row.companyName}
                </Text>
              </Box>
              <HStack justifyContent={"center"} mt={6}>
                <Button
                  borderRadius={6}
                  colorScheme="red"
                  onClick={() => deleteThisRow({ row })}
                  isLoading={isLoadind}
                >
                  Delete
                </Button>
                <Button
                  borderRadius={6}
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
