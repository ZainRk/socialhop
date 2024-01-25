import React from "react";
import css from "@/styles/Header.module.css";
import { Flex } from "antd";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Box from "./Box";
import ModeButton from "./ModeButton";
import SidebarButton from "./SidebarButton";
const Header = () => {
  return (
    <header className={css.wrapper}>
      <Box style={{ height: "100%" }}>
        <div className={css.container}>
          {/* sidbear button */}

          <div className={css.sidebarButton}>
            <SidebarButton />
          </div>

          {/* logo */}
          <Image
            src="/images/logo.png"
            width={150}
            height={40}
            alt="logo"
            className={css.logo}
          />
          {/* actions */}
          <Flex gap={25} align="center"> 
            <ModeButton />
            <UserButton afterSignOutUrl="/sign-in" />
          </Flex>
        </div>
      </Box>
    </header>
  );
};

export default Header;
