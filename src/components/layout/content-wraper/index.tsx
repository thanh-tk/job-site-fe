import React from "react";
import { Layout } from "antd";
import { IRoute } from "src/interfaces";
import navgationRoutes from "src/constants/navigation";
import { Route, Routes } from "react-router-dom";
import BreadcrumbCommon from "src/components/common/breadcrumb";

import SideBar from "src/components/common/side-bar";

const { Header, Content, Footer } = Layout;

export const ContentWrapper = () => {
  const listenRoutes = (routes: IRoute[]) => {
    return routes?.map(({ path = "", component: Comp, children }, i) => {
      if (!path) return null;
      const routePath = path
        .replace(/\/?(\?.*)*$/g, "/*$1")
        .replace(/\/\*\/\*?/, "/*");

      if (children?.length) {
        return (
          <Route key={i} path={routePath} element={Comp && <Comp />}>
            {listenRoutes(children)}
          </Route>
        );
      }

      if (!Comp) return null;
      return <Route path={routePath} element={<Comp />} key={i} />;
    });
  };

  return (
    <Layout className="min-h-screen">
      <SideBar />
      <Layout>
        <Header className="bg-gray-300" />
        <Content className="p-4">
          <BreadcrumbCommon className="my-2" />
          <div>
            <Routes>{listenRoutes(navgationRoutes)}</Routes>
          </div>
        </Content>
        <Footer className="bg-gray-300 text-center">
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
