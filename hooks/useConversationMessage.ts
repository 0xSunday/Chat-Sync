import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useConversationMessage = (userId?: string) => {
  const url = userId ? `/api/conversations/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useConversationMessage;
