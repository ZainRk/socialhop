import { getPosts } from "@/actions/post";
import { getAllFollowersAndFollowings } from "@/actions/user";
import HomeView from "@/sections/home/view/HomeView";
import { currentUser } from "@clerk/nextjs";
import { QueryClient } from "@tanstack/react-query";

export const metadata = () => {
  return {
    title: `Socialhop`,
    description: `New way to feel freedom`,
  };
};

const HomePage = async () => {
  const queryClient = new QueryClient();
  const user = await currentUser();
  // get posts
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "all"],
    queryFn: ({ pageParam = "" }) => getPosts(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

  return <HomeView />;
};

export default HomePage;