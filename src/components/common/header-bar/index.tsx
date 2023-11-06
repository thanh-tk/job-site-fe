import React from "react";
import { Header } from "antd/es/layout/layout";
import BreadcrumbCommon from "components/common/breadcrumb";
import { Avatar } from "antd";

const HeaderBar = () => {
  return (
    <Header className="bg-gray-300 !px-4 sticky flex flex-row justify-between items-center">
      <BreadcrumbCommon className="my-2" />
      <Avatar size={40} className="">USER</Avatar>
    </Header>
  );
};
export default HeaderBar;