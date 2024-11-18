import { useQuery, QueryKey } from "@tanstack/react-query";

interface UseCustomQueryOptions<TResponse> {
  queryKey: QueryKey;
  queryFn: ({ queryKey }: { queryKey: QueryKey }) => Promise<TResponse>;
  staleTime?: number;
  gcTime?: number;
}

const useCustomQuery = <TResponse>({
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

type QueryFn<T> = (id: string) => Promise<T>;

export const createResourceQuery = <T>(
  resourceName: string,
  fetchFn: QueryFn<T>
) => {
  return (id?: string) => {
    const queryKey = id ? [resourceName, id] : [resourceName];

    return useCustomQuery<T>({
      queryKey,
      queryFn: ({ queryKey }) => {
        const [, resourceId] = queryKey as [string, string?];
        return fetchFn(resourceId ?? "default");
      },
    });
  };
};
