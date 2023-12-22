'use client'
import { Drawer } from "antd";
import useWindowDimensions from "@/hooks/useWindowsDimension";
import css from "@/styles/Sidebar.module.css";
const SidebarContainer = ({
  isDrawrOpen,
  setIsDrawerOpen,
  children,
  ...other
}) => {
  const { width } = useWindowDimensions();

  if (width <= 1268) {
    return (
      <Drawer
        {...other}
        placement={"left"}
        open={isDrawrOpen}
        onClose={() => setIsDrawerOpen(false)}
        height={"100%"}
      >
        <div className={css.drawerContainer}>{children}</div>
      </Drawer>
    );
  }
  return children;
};

export default SidebarContainer;
