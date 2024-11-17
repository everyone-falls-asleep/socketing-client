import { useMutation } from "@tanstack/react-query";

export const usePostMutation = <TResponse, TError, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TResponse>,
  onSuccess?: (data: TResponse) => void,
  onError?: (error: TError) => void
) => {
  return useMutation<TResponse, TError, TVariables>({
    mutationFn,
    onSuccess,
    onError,
  });
};
