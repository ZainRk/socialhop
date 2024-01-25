import { getPosts } from "@/actions/post";
import HomeView from "@/sections/home/view/HomeView";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const metadata = () => {
  return {
    title: `Socialhop`,
    description: `New way to feel freedom`,
  };
};

const HomePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "all"],
    queryFn: ({ pageParam = "" }) => getPosts(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeView />
    </HydrationBoundary>
  );
};

export default HomePage;
