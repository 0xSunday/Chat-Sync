import React from "react";
import UserBox from "./UserBox";
import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";

// Your own user ID (replace this with your actual user ID)
const yourUserId = "0xSunil";

const UserList = () => {
  const { data: users = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();

  // Filter out your own user data
  const filteredUsers = users.filter((user) => user.username !== currentUser.username);
  // console.log(users);
  return (
    <div className="">
      <div className="flex-col">
        {filteredUsers.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
