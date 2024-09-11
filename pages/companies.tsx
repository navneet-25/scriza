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
import SocialProfileSimple from "../components/Card";
import StatsCard from "../components/Stats";
import { LuBuilding2 } from "react-icons/lu";
import bg from "../assets/backgrounds/abstract1.svg";
import bg2 from "../assets/backgrounds/abstract2.svg";
import bg3 from "../assets/backgrounds/abstract3.svg";
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
} from "@chakra-ui/react";

import { ExportCSV } from "../components/table/CompaniesTable";
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/next-js";
import { FaPlus } from "react-icons/fa6";

const Companies = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { push } = useRouter();

  return (
    <Box
      ml={{ base: 0, md: 60 }}
      padding={6}
      borderRadius={10}
      backgroundColor={"#fff"}
    >
      <HStack fontSize={12} fontWeight={"600"} color={"purple"}>
        <Link href={"/"}>Home</Link>
        <Text>{">"}</Text>
        <Link href={"/companies"}>Companies</Link>
      </HStack>

      <Flex justifyContent={"space-between"}>
        <Box my={5}>
          <Text fontWeight={"700"} color={"#000"} fontSize={20}>
            Companies Details
          </Text>
        </Box>
        <HStack>
          <Button
            colorScheme={"purple"}
            borderRadius={6}
            onClick={() => push("/addCompany")}
            leftIcon={<FaPlus />}
          >
            Add New Company
          </Button>
        </HStack>
      </Flex>
      {/* <DataTable columns={columns} data={data} selectableRows /> */}
      <ExportCSV />
    </Box>
  );
};

export default Companies;
