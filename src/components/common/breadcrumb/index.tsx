import { Breadcrumb } from "antd";
import React, { memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { UUID_V4 } from "constants/REGEX";
import navgationRoutes from "constants/navigation";
import { BreadcrumbItem } from "types";
import styles from "./breadcrumb.module.scss"; 

interface BreadcrumbCommonProps {
  className: string;
}
const BreadcrumbCommon: React.FC<BreadcrumbCommonProps> = ({ className }) => {
  const location = useLocation();

  const { pathname } = location;
  const pathNames = pathname.split("/").filter((item) => item);

  const breadItems = pathNames.map((name, idx) => {
    const routingItem = navgationRoutes.find((item) => item.path === name);
    const routeTo = `/${pathNames.slice(0, idx + 1).join("/")}`;
    return {
      title: routingItem?.name || name,
      path: routeTo,
    };
  });

  const renderItem = useCallback(
    ( item: BreadcrumbItem,
      params: unknown,
      items: BreadcrumbItem[],
      paths: string[]
    ) => {
      const last = items.indexOf(item) === items.length - 1;
      const regExt = RegExp(UUID_V4);
      const isID = regExt.test(item.title?.toString() || "");

      if (!last && isID) {
        return null;
      }

      return last ? (
        <span className="font-medium text-3xl h-auto">
          {isID ? "Detail" : item.title?.toString().toUpperCase()}
        </span>
      ) : (
        <Link className="font-medium text-3xl !h-auto" to={paths.join("/")}>
          {item.title?.toString().toUpperCase()}
        </Link>
      );
    },
    [pathname]
  );

  return (
    <div className={`${styles.container} ${className}`}>
      <Breadcrumb
        itemRender={renderItem}
        items={breadItems}
        separator={<span className={styles.seperator}>/</span>}
      />
    </div>
  );
};
export default memo(BreadcrumbCommon);
