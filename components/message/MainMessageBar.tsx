import React, { useState } from "react";
import MessageBar from "./MessageBar";
import useUsers from "@/hooks/useUsers";
import useMainConversation from "@/hooks/useMainConversation";

import UserList from "./UserList";
import Header from "../Header";
import ConversationList from "./ConversationList";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

import { HiChat } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import clsx from "clsx";
const MainMessageBar = () => {
  // const users = await getUsers();

  // const conversations =  getConversations();
  // const users = getUsers();
  const { data: users = [] } = useUsers();
  const { data: conversations = [] } = useMainConversation();

  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);

  const handleClickButton1 = () => {
    setShowButton1(true);
    setShowButton2(false);
  };

  const handleClickButton2 = () => {
    setShowButton1(false);
    setShowButton2(true);
  };
  return (
    <div
      className="border-l-[1px] 
    border-neutral-800 text-white"
    >
      <Header showBackArrow label="Messages" />
      {/* <MessageBar /> */}

      <div className="flex justify-around items-center my-4 flex-row  w-full">
        <button
          onClick={handleClickButton1}
          className={clsx(
            ` border-[1px] border-gray-600 
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
          
          `,
            showButton1 && "text-black bg-white"
          )}
        >
          <div>
            <HiChat size={25} />
          </div>
        </button>

        <button
          onClick={handleClickButton2}
          className={clsx(
            ` border-[1px] border-gray-600 
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
          
          `,
            showButton2 && "text-black bg-white"
          )}
        >
          <div>
            <HiUsers size={25} />
          </div>
        </button>
      </div>

      {showButton1 && <ConversationList initialItems={conversations} />}
      {showButton2 && <UserList />}
    </div>
  );
};

export default MainMessageBar;
