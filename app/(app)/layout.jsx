import React from "react";
import css from "@/styles/homeLayout.module.css";
import Header from "@/components/Header";
import ThemeProvider from "@/lib/ThemeProvider";
import Box from "@/components/Box";
import Sidebar from "@/components/Sidebar";
import { SettingsContextProvider } from "@/context/settings/settings-provider";
const HomeLayout = ({ children }) => {
  return (
    <SettingsContextProvider>
      <ThemeProvider>
        <Box type="baseBg">
          <div className={css.wrapper}>
            {/* header */}
            <Header />

            {/* body */}
            <div className={css.container}>
              <Sidebar />

              <div className={css.page_body}>{children}</div>
            </div>
          </div>
        </Box>
      </ThemeProvider>
    </SettingsContextProvider>
  );
};

export default HomeLayout;
