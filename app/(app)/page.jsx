import {  getMyPostsFeed } from "@/actions/post";
import HomeView from "@/sections/home/view/HomeView";
import { QueryClient } from "@tanstack/react-query";

export const metadata = () => {
  return {
    title: `Socialhop`,
    description: `New way to feel freedom`,
  };
};

const HomePage = async () => {
  const queryClient = new QueryClient();
  // get posts
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "all"],
    queryFn: ({ pageParam = "" }) => getMyPostsFeed(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

  return <HomeView />;
};

export default HomePage;
