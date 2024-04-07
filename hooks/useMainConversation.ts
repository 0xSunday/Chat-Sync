import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useMainConversation = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/conversation",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useMainConversation;
