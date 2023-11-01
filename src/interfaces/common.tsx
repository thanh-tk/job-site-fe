import { ComponentType, ReactNode } from "react";

export interface QueryParam {
  [key: string]: any;
  page?: Page;
  sort?: Sort;
}

interface Page {
  number: number;
  size: number;
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