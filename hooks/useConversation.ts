// import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useSearchParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(() => ({
    isOpen,
    conversationId
  }), [isOpen, conversationId]);
};

export default useConversation;