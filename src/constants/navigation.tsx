import React, { lazy } from "react";
import { FolderOpenOutlined, HomeOutlined } from "@ant-design/icons";
import PAGE_URL from "constants/PAGE_URL";
import { IRoute } from "interfaces";

const navgationRoutes: IRoute[] = [
  {
    icon: <HomeOutlined />,
    name: "Home",
    path: PAGE_URL.home.main,
    component: lazy(() => import("../features/home")),
  },
  {
    icon: <FolderOpenOutlined />,
    name: "Job",
    path: PAGE_URL.job.main,
    component: lazy(() => import("../features/jobs")),
    children: [
      {
        name: "Listing",
        path: PAGE_URL.job.main,
        component: lazy(() => import("../features/jobs/listing")),
        isDefault: true,
      },
      {
        name: "Detail",
        path: PAGE_URL.job.page.viewJob,
        component: lazy(() => import("../features/jobs/detail")),
      },
      {
        name: "Edit",
        path: PAGE_URL.job.page.editJob,
        component: lazy(() => import("../features/jobs/form")),
      },
      {
        name: "New",
        path: PAGE_URL.job.page.createJob,
        component: lazy(() => import("../features/jobs/form")),
      },
    ],
  },
];
export default navgationRoutes;
