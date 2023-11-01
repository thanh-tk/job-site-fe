import { QueryParam } from "interfaces";

export const QueryForList = (endpoint: string, queryParams: QueryParam): string => {
  const url = new URL(endpoint);

  if (queryParams.page) {
    url.searchParams.set("page[number]", queryParams.page.number.toString());
    url.searchParams.set("page[size]", queryParams.page.size.toString());
  }

  if (queryParams.sort) {
    url.searchParams.set("sort[col]", queryParams.sort.col);
    url.searchParams.set("sort[dir]", queryParams.sort.dir);
  }

  return url.toString();
};
