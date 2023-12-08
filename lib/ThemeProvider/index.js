"use client";

import { useSettingsContext } from "@/context/settings/settings-context";
import { ConfigProvider, theme } from "antd";
import { useCallback } from "react";

const ThemeProvider = ({ children }) => {
  
  
  const {settings : {
    theme : globalTheme
  }}  = useSettingsContext();


  const BoxBg = useCallback(() => {
    return globalTheme === "light" ? "white" : "rgb(33, 43, 54)";
  }, [globalTheme]);

  const BaseBg = useCallback(() => {
    return globalTheme === "light" ? "#F4F6F8" : "black";
  }, [globalTheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          globalTheme === "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
        token: {
          fontFamily: 'inherit',
          colorPrimary: "#F9AA11",
          boxBg: BoxBg(),
          baseBg: BaseBg(),
        },
        components: {
          Typography: {
            fontSize: 'none',
            lineHeight: 'none',
            fontWeightStrong: 'none',
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
