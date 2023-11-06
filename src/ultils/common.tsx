import { QueryParam } from "interfaces";
import dayjs from "dayjs";
import moment from "moment";
export const queryForList = (
  endpoint: string,
  queryParams: QueryParam
): string => {
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

export const formPatchValues = (data: any) => {
  let reData = { ...data };
  console.log("🚀 :: file: common.tsx:22 :: reData:", reData);

  Object.keys(reData).forEach((key) => {
    const value = data[key];
    if (moment(value, true).isValid()) {
      reData = { ...reData, [key]: dayjs(value) };
    }
  });
  return reData;
};
