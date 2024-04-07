import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/pages/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  // console.log(items)
  return (
    <div>
      <aside
        className={clsx(
          `pb-20 lg:pb-0 lg:block overflow-y-auto 
`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="">
          {/* <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full  p-2 cursor-pointer hover:opacity-75  transitio "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div> */}
          {initialItems.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
            // <div>{item.id}</div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ConversationList;
