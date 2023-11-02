import React from "react";
import { Layout } from "antd";
import SideBar from "components/common/side-bar";
import navgationRoutes from "constants/navigation";
import { IRoute } from "interfaces";
import { Route, Routes } from "react-router-dom";
import HeaderBar from "components/common/header-bar";

const { Content, Footer } = Layout;

export const ContentWrapper: React.FC = () => {
  const listenRoutes = (routes: IRoute[]) => {
    return routes?.map(
      ({ path = "", component: Comp, children, isDefault }, i) => {
        if (!path) return null;

        if (children?.length) {
          return (
            <Route key={i} path={path}>
              {listenRoutes(children)}
            </Route>
          );
        }

        if (!Comp) return null;
        return (
          <Route
            index={isDefault}
            path={isDefault ? undefined : path}
            element={<Comp />}
            key={i}
          />
        );
      }
    );
  };

  return (
    <Layout className="min-h-screen">
      <SideBar />
      <Layout>
        <HeaderBar />
        <Content className="p-4 overflow-auto ">
          <div>
            <Routes>{listenRoutes(navgationRoutes)}</Routes>
          </div>
        </Content>
        <Footer className="bg-gray-300 text-center">
         ©2023 Created 
        </Footer>
      </Layout>
    </Layout>
  );
};
