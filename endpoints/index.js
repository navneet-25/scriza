import axiosClient from "../utils/axios/axiosConfig";

export const getCompanies = async () => {
  const { data } = await axiosClient.get("/fetch");
  return data;
};

export const deleteCompanies = async ({ row }) => {
  const body = { ...row };
  const { data } = await axiosClient.post("/delete", body);
  return data;
};

export const updatePackageEndpoint = async ({ row, packagee }) => {
  const body = { ...row, packagee };
  const { data } = await axiosClient.post("/updatePackage", body);
  return data;
};

export const changeStatusOfCompanies = async ({ row, changedStatus }) => {
  const body = { ...row, changedStatus };
  console.log("body   ======>", body);
  const { data } = await axiosClient.post("/changeStatus", body);
  return data;
};

export const getCount = async () => {
  const { data } = await axiosClient.post("/getCount");
  return data;
};

export const updateCompany = async ({
  companyName,
  login,
  packagee,
  createdOn,
  status,
  phone,
  address,
  country,
  name,
  email,
  password,
  id,
}) => {
  const body = {
    companyName,
    login,
    packagee,
    createdOn,
    status,
    phone,
    address,
    country,
    name,
    email,
    password,
    id,
  };
  const { data } = await axiosClient.post("/update", body);
  return data;
};

export const insertCompany = async ({
  companyName,
  login,
  packagee,
  createdOn,
  status,
  phone,
  address,
  country,
  name,
  email,
  password,
}) => {
  const body = {
    companyName,
    login,
    packagee,
    createdOn,
    status,
    phone,
    address,
    country,
    name,
    email,
    password,
  };
  const { data } = await axiosClient.post("/insert", body);
  return data;
};
