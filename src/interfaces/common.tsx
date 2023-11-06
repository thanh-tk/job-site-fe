import { ComponentType, ReactNode } from "react";

export interface QueryParam {
  [key: string]: any;
  page?: Page;
  sort?: Sort;
}

interface Page {
  number: string | number;
  size: string | number;
}
interface Sort {
  col: string;
  dir: "asc" | "desc";
}

export interface IRoute {
  path: string;
  icon?: ReactNode;
  iconText?: string;
  name?: string;
  label?: string;
  component?: ComponentType<unknown> | null;
  children?: IRoute[];
  type?: string;
  exact?: boolean;
  isRoute?: boolean;
  isDefault?: boolean;
}
export interface TablePaging {
  // dataSource?: T[];
  currentPage: string | number;
  pageSize: string | number;
}
export interface QueryDataResponse<T> {
  totalPage: number
  dataList: T;
  
}