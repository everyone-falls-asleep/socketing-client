import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

export const usePostMutation = <TResponse, TError, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TResponse>,
  options?: UseMutationOptions<TResponse, TError, TVariables>
): UseMutationResult<TResponse, TError, TVariables> => {
  return useMutation<TResponse, TError, TVariables>({
    mutationFn,
    ...options,
  });
};
