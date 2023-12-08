"use client";
import React from "react";
import Box from "./Box";
import css from "@/styles/Sidebar.module.css";
import { sidebarRoutes } from "@/lib/sidebar";
import { Typography } from "antd";
import Iconify from "./Iconify";
import cx from "classnames";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarContainer from "./SidebarContainer";
import { useSettingsContext } from "@/context/settings/settings-context";
const Sidebar = () => {
  const pathname = usePathname();

  const {
    settings: { isSidebarOpen },
    setSettings,
  } = useSettingsContext();

  const handleDrawerClose = () => {
    setSettings((prev) => ({
      ...prev,
      isSidebarOpen: false,
    }));
  };

  const isActive = (route) => {
    if (route.route === pathname) return css.active;
  };

  const activeColor = (route) => {
    return isActive(route) && "var(--primary)";
  };

  return (
    <SidebarContainer
      isDrawrOpen={isSidebarOpen}
      setIsDrawerOpen={handleDrawerClose}
    >
      <aside className={css.wrapper}>
        <Box className={css.container}>
          {sidebarRoutes.map((route, index) => (
            <Link
              href={route.route}
              key={index}
              className={cx(css.item, isActive(route))}
            >
              {/* icon */}
              <Typography style={{ color: activeColor(route) }}>
                <Iconify icon={route.icon} width={"20px"} />
              </Typography>

              {/* name */}
              <Typography className="typoSubtitle2" style={{ color: activeColor(route) }}>
                {route.name}
              </Typography>
            </Link>
          ))}
        </Box>
      </aside>
    </SidebarContainer>
  );
};

export default Sidebar;
