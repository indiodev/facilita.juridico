import { QueryClient } from "@tanstack/react-query";

export const Tanstack = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // staleTime: 5000 * 60 // 1 minute
    },
  },
});
