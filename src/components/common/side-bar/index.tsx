import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import navgationRoutes from "constants/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(navgationRoutes[0].path);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.length === 1) {
      setSelectedKey(location.pathname);
      return;
    }
    const currentPath = location.pathname.split("/")[1];
    if (location.pathname.length > 1) {
      if (currentPath !== selectedKey) {
        setSelectedKey(currentPath);
      }
    }
  }, [location]);

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
  const items: MenuItem[] = navgationRoutes.map((item) => {
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
        defaultSelectedKeys={[selectedKey ?? navgationRoutes[0].path]}
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
        onClick={(data) => {
          navigation(data.key);
        }}
      />
    </Sider>
  );
};
export default memo(SideBar);
