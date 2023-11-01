import React, { lazy } from "react";
import { FolderOpenOutlined, HomeOutlined } from "@ant-design/icons";
import PAGE_URL from "src/constants/PAGE_URL";
import { IRoute } from "src/interfaces";

const navgationRoutes: IRoute[] = [
  {
    icon: <HomeOutlined />,
    name: "Home",
    path: PAGE_URL.home,
    component: lazy(() => import("../features/home")),
  },
  {
    icon: <FolderOpenOutlined />,
    name: "Job",
    path: PAGE_URL.job.main,
    component: lazy(() => import("../features/jobs")),
    children: [
      {
        name: "Detail",
        path: PAGE_URL.job.viewJob,
        component: lazy(() => import("../features/home")),
      },
    ],
  },
];
export default navgationRoutes;
