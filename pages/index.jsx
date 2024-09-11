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
import Chart1 from "../components/home/Chart1";
import WeeklyRevenue from "../components/home/WeeklyRevenue";
import DailyTraffic from "../components/home/DailyTraffic";
import Conversion from "../components/home/PieCard";
import { IoCalendarOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getCompanies, getCount } from "../endpoints";
import { useEffect } from "react";

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["counts"],
    queryFn: (e) => getCount(),
  });

  return (
    <Box ml={{ base: 0, md: 60 }}>
      {/* <Button onClick={getCount}>GET</Button> */}
      {/* Content */}
      <SimpleGrid columns={[1, 1, 2, 3]} spacing="20px">
        <StatsCard
          count={isLoading ? "--" : data.result.count}
          icon={LuBuilding2}
          title="Total Companys"
          bg={bg.src}
        />
        <StatsCard
          count={isLoading ? "--" : data.result_2.activeCount}
          icon={IoCalendarOutline}
          title="Weekly Active Companies"
          bg={bg2.src}
        />
        <StatsCard
          count={20}
          icon={RiMoneyDollarCircleLine}
          title="Total Income"
          bg={bg3.src}
        />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 2 }}
        gap="20px"
        mt={12}
        mb="20px"
      >
        <Chart1 bg="#fff" />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 2 }}
        gap="20px"
        mt={12}
        mb="20px"
      >
        <DailyTraffic />
        <Conversion />
      </SimpleGrid>
      {/* <SocialProfileSimple /> */}
    </Box>
  );
};

export default SidebarWithHeader;
