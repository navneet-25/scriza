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
  Select,
  useToast,
  useBoolean,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { EditPackageTypes } from "../../interfaces";
import { useEffect, useState } from "react";
import { updatePackageEndpoint } from "../../endpoints";
import { queryClient } from "../../pages/_app";

export default function EditPackage({
  isOpen,
  onOpen,
  onClose,
  row,
}: EditPackageTypes) {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(row?.packagee);
  const [isLoadind, setLoading] = useBoolean();
  const toast = useToast();

  const updatePackagee = async () => {
    setLoading.on();
    console.log("row ----->", row);
    await updatePackageEndpoint({ packagee: selected, row: row });
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

  useEffect(() => {
    console.log("selected ----->", selected);
  }, [selected]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box mt={16} mb={6}>
              <Select
                onChange={(e) => setSelected(e.target.value)}
                // placeholder="Select option"
                defaultValue={row?.packagee}
              >
                <option value="Monthly">Monthly</option>
                <option value="Anual">Anual</option>
              </Select>
              <HStack justifyContent={"center"} mt={6}>
                <Button
                  borderRadius={6}
                  colorScheme="red"
                  onClick={updatePackagee}
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
