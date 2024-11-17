import { useQuery, QueryKey } from "@tanstack/react-query";

interface UseCustomQueryOptions<TResponse> {
  queryKey: QueryKey;
  queryFn: ({ queryKey }: { queryKey: QueryKey }) => Promise<TResponse>;
  staleTime?: number;
  gcTime?: number;
}

export const useCustomQuery = <TResponse>({
  queryKey,
  queryFn,
  staleTime = 1000 * 60 * 5, // 기본 staleTime
  gcTime = 1000 * 60 * 10, // 기본 garbage collection time
}: UseCustomQueryOptions<TResponse>) => {
  return useQuery<TResponse, Error>({
    queryKey,
    queryFn,
    staleTime,
    gcTime,
  });
};
