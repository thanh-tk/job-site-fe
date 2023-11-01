import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import navgationRoutes from "src/constants/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigate();
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = navgationRoutes.map((item, idx) => {
    return getItem(item.name, item.path, item.icon);
  });

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="" />
      <Menu
        theme="dark"
        defaultSelectedKeys={[navgationRoutes[0].path]}
        mode="inline"
        items={items}
        onClick={(data) => navigation(data.key)}
      />
    </Sider>
  );
};
export default memo(SideBar);
