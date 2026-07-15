import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Dashboard } from "@/components/dashboard";
import { dashboardQueryKey, getDashboardData } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: dashboardQueryKey,
    queryFn: getDashboardData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
