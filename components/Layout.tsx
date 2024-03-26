import React, { useEffect, useState } from "react";
import FollowBar from "@/components/layout/FollowBar";
import Sidebar from "@/components/layout/Sidebar";
import BottomBar from "./layout/BottomBar";
import { useRouter } from "next/router";
import MessageBar from "./message/MessageBar";
import getUsers from "./actions/getUsers";
import MainMessageBar from "./message/MainMessageBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const fetchedUsers = await getUsers();
  //       setUsers(fetchedUsers);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const inMessageRoute = router.pathname === "/messages";

  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-1 h-full md:grid-cols-4">
          <Sidebar />

          {inMessageRoute && <MainMessageBar />}
          <div className="border-x-[1px] border-neutral-800 col-span-2">
            {children}
          </div>
          {!inMessageRoute && <FollowBar />}

          <BottomBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
