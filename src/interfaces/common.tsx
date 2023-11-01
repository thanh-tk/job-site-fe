export interface QueryParam {
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
