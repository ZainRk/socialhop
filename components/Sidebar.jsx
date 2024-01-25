"use client";
import React, { useCallback, useEffect, useState } from "react";
import Box from "./Box";
import css from "@/styles/Sidebar.module.css";
import { sidebarRoutes } from "@/lib/sidebar";
import { Typography } from "antd";
import Iconify from "./Iconify";
import cx from "classnames";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import SidebarContainer from "./SidebarContainer";
import { useSettingsContext } from "@/context/settings/settings-context";
import { useClerk, useUser } from "@clerk/nextjs";
const Sidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    settings: { isSidebarOpen },
    setSettings,
  } = useSettingsContext();

  const handleDrawerClose = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isSidebarOpen: false,
    }));
  }, [setSettings]);

  useEffect(() => {
    if (isSidebarOpen) {
      handleDrawerClose();
    }
  }, [pathname, handleDrawerClose]);

  const isActive = (route) => {
    if (route.route === pathname) return css.active;
  };

  const activeColor = (route) => {
    return isActive(route) && "var(--primary)";
  };

  return (
    mounted && (
      <SidebarContainer
        isDrawrOpen={isSidebarOpen}
        setIsDrawerOpen={handleDrawerClose}
      >
        <div className={css.wrapper}>
          <Box className={css.container}>
            {sidebarRoutes(user).map((route, index) => (
              <Link
                // if the route is profile, then add the person query
                href={
                  route.route === `/profile/${user?.id}`
                    ? `${route.route}?person=${user?.firstName}`
                    : `${route.route}`
                }
                key={index}
                className={cx(css.item, isActive(route))}
              >
                {/* icon */}
                <Typography style={{ color: activeColor(route) }}>
                  <Iconify icon={route.icon} width={"20px"} />
                </Typography>

                {/* name */}
                <Typography
                  className="typoSubtitle2"
                  style={{ color: activeColor(route) }}
                >
                  {route.name}
                </Typography>
              </Link>
            ))}

            <Link
              href={""}
              className={cx(css.item)}
              onClick={() => {
                signOut(() => router.push("/sign-in"));
              }}
            >
              {/* icon */}
              <Typography>
                <Iconify icon={"solar:logout-2-bold"} width={"20px"} />
              </Typography>

              {/* name */}
              <Typography className="typoSubtitle2">Sign out</Typography>
            </Link>
          </Box>
        </div>
      </SidebarContainer>
    )
  );
};

export default Sidebar;
