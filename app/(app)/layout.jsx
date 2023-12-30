import React from "react";
import css from "@/styles/homeLayout.module.css";
import Header from "@/components/Header";
import ThemeProvider from "@/lib/ThemeProvider";
import Box from "@/components/Box";
import Sidebar from "@/components/Sidebar";
import { SettingsContextProvider } from "@/context/settings/settings-provider";
import { Toaster } from "react-hot-toast";
const HomeLayout = ({ children }) => {
  return (
    <SettingsContextProvider>
      <ThemeProvider>
        <Box
          type="baseBg"
          style={{ position: "relative", width: "100vw", height: "100vh" }}
        >
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
        <Toaster />
      </ThemeProvider>
    </SettingsContextProvider>
  );
};

export default HomeLayout;
