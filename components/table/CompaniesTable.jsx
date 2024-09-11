import {
  Badge,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import EditCompany from "../edit/EditCompany";
import DeleteModal from "../delete/ComfirDelete";
import EditPackage from "../edit/EditPackage";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { changeStatusOfCompanies, getCompanies } from "../../endpoints";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../pages/_app";
import { FaRegFilePdf } from "react-icons/fa6";

// export const getProducts = () => fetch("/api/product");

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "14px",
      fontWeight: "700",
      background: "#dadada",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      fontWeight: "500",
      color: "#989898",
    },
  },
};

const columns = [
  {
    name: "#",
    selector: (row) => row.rowId,
    maxWidth: "20px",
  },
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
    maxWidth: "20px",
  },
  {
    name: "Company Name",
    selector: (row) => row.companyName,
    sortable: true,
  },
  {
    name: "Login",
    selector: (row) => row.login,
    sortable: true,
    maxWidth: "10px",
  },
  {
    name: "Package",
    selector: (row) => row.packagee,
    sortable: true,
    cell: (row) => <CustomPackageButton row={row} />,
  },
  {
    name: "Created On",
    selector: (row) => row.createdOn,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => <CustomStatusButton row={row} />,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    sortable: true,

    cell: (row) => <CustomAction row={row} />,
  },
];

const data = [
  {
    rowId: 1,
    id: "asd 1",
    companyName: "Beetlejuice",
    login: 0,
    package: "Monthly",
    createdOn: "16-Jul-2024",
    status: true,
    action: "",
  },
  {
    rowId: 2,
    id: "asd 2",
    companyName: "Beetlejuice",
    login: 0,
    package: "Monthly",
    createdOn: "16-Jul-2024",
    status: false,
    action: "",
  },
  {
    rowId: 3,
    id: "asd 3",
    companyName: "Beetlejuice",
    login: 0,
    package: "Monthly",
    createdOn: "16-Jul-2024",
    status: true,
    action: "",
  },
];

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const Export = ({ onExport }) => (
  <Button
    colorScheme={"purple"}
    borderRadius={6}
    onClick={(e) => onExport(e.target.value)}
    variant={"outline"}
    leftIcon={<FaRegFilePdf />}
  >
    Export
  </Button>
);

export const ExportCSV = () => {
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: companies,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: (e) => getCompanies(),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(companies?.result)} />,
    []
  );

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={companies?.result}
        actions={actionsMemo}
        customStyles={customStyles}
        pagination
        progressPending={isLoading}
        progressComponent={<Spinner />}
      />
    </>
  );
};

const CustomStatusButton = ({ row }) => {
  const [isLoadind, setLoading] = useBoolean();

  const toggleStatus = async ({ status }) => {
    setLoading.on();
    // await changeStatusOfCompanies({ row, changedStatus: status });
    await changeStatusOfCompanies({ changedStatus: status, row });
    setLoading.off();
    return queryClient.invalidateQueries({ queryKey: ["companies"] });
  };

  if (isLoadind) return <Spinner />;

  return Number(row.status) ? (
    <Badge
      colorScheme="purple"
      cursor={"pointer"}
      onClick={() => toggleStatus({ status: 0 })}
    >
      Active
    </Badge>
  ) : (
    <Badge
      colorScheme="red"
      cursor={"pointer"}
      onClick={() => toggleStatus({ status: 1 })}
    >
      Inactive
    </Badge>
  );
};

const CustomPackageButton = ({ row }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex alignItems={"center"} gap={2}>
      <Text>Basic ({row.packagee})</Text>
      <FiEdit
        size={20}
        color="#4040f0"
        style={{ cursor: "pointer" }}
        onClick={onOpen}
      />
      <EditPackage
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        row={row}
      />
    </Flex>
  );
};

const CustomAction = ({ row }) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu>
      <MenuButton as={Button}>
        <BsThreeDots />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={onOpenEdit}>
          <Flex gap={4} alignItems={"center"}>
            <Text fontWeight={"600"} fontSize={14}>
              Edit
            </Text>
            <FiEdit size={20} color="#4040f0" style={{ cursor: "pointer" }} />
            <EditCompany
              isOpen={isOpenEdit}
              onClose={onCloseEdit}
              onOpen={onOpenEdit}
              row={row}
            />
          </Flex>
        </MenuItem>
        <MenuItem onClick={onOpen}>
          <Flex gap={4} alignItems={"center"}>
            <Text fontWeight={"600"} fontSize={14}>
              Delete
            </Text>
            <MdDelete size={20} color="red" style={{ cursor: "pointer" }} />
            <DeleteModal
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              row={row}
            />
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default {
  title: "Examples/Export CSV",
  component: ExportCSV,
};
