export interface RowTypes {
  companyName: string;
  login: number;
  packagee: string;
  createdOn: number;
  status: number;
  phone: string;
  address: string;
  country: string;
  name: string;
  email: string;
  password: string;
  id: number;
}

export interface EditPackageTypes {
  isOpen: boolean;
  onOpen: () => {};
  onClose: () => {};
  row: RowTypes;
}
