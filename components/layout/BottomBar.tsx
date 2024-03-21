import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import BottemBarItem from "./BottemBarItem";

const BottomBar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      alert: currentUser?.hasNotification,
    },

    {
      icon: FaUser,
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      auth: true,
    },

    {
      icon: MdMessage,
      label: "Message",
      href: `/`,
      auth: true,
    },
  ];
  return (
    <div className="md:hidden flex relative  bg-black">
      <div className="absolute bottom-0 right-0 left-0">
        <div className="space-y-2 px-2  pb-8 lg:w-[230px] flex flex-row justify-around  ">
          {items.map((item) => (
            <BottemBarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
