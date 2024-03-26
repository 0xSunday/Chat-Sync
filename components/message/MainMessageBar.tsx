import React from "react";
import MessageBar from "./MessageBar";
import useUsers from "@/hooks/useUsers";
import UserList from "./UserList";
import Header from "../Header";

const MainMessageBar = () => {
  // const users = await getUsers();
 
  // console.log(users);
  return (
    <div
      className="border-l-[1px] 
    border-neutral-800 text-white"
    >
       <Header showBackArrow label="Messages" />
      <MessageBar />
      <UserList />
    </div>
  );
};

export default MainMessageBar;
