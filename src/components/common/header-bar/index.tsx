import React from "react";
import { Header } from "antd/es/layout/layout";
import BreadcrumbCommon from "components/common/breadcrumb";

const HeaderBar = () => {
  return (
    <Header className="bg-gray-300 !px-4">
      <BreadcrumbCommon className="my-2" />
    </Header>
  );
};
export default HeaderBar;