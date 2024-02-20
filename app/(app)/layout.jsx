import React from "react";
import css from "@/styles/homeLayout.module.css";
import Header from "@/components/Header";
import ThemeProvider from "@/lib/ThemeProvider";
import Box from "@/components/Box";
import Sidebar from "@/components/Sidebar";
import { SettingsContextProvider } from "@/context/settings/settings-provider";
import { Toaster } from "react-hot-toast";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getAllFollowersAndFollowings,
} from "@/actions/user";
import { currentUser } from "@clerk/nextjs";
const HomeLayout = async ({ children }) => {
  const queryClient = new QueryClient();
  const user = await currentUser();

  // get profile info of logged in user
  await queryClient.prefetchQuery({
    queryKey: ["user", user?.id, "followInfo"],
    queryFn: () => getAllFollowersAndFollowings(user?.id),
    enabled: !!user,
    // 20 mins stale time
    staleTime: 1000 * 60 * 20,
  });


  return (
    <SettingsContextProvider>
      <ThemeProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
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
        </HydrationBoundary>
        <Toaster />
      </ThemeProvider>
    </SettingsContextProvider>
  );
};

export default HomeLayout;
