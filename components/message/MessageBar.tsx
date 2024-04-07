import React, { useState } from "react";
import Header from "../Header";
import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "./DesktopMessageBarItem";

const MessageBar: React.FC<DesktopSidebarProps> = () => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  // console.log({ currentUser }, "TEST");

  return (
    <div>
      <div
        className="
        
      flex
      
      text-white bg-black w-full border-b-[1px]  border-neutral-800
      "
      >
        <nav className="my-4 flex flex-row justify-between w-full">
          <ul
            role="list"
            className="flex flex-row items-center w-full justify-around space-y-1"
          >
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            {/* <Avatar user={currentUser} /> */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MessageBar;
