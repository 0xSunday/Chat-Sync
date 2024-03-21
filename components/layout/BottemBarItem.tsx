import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {

  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}


const BottemBarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  auth,
  onClick,
  alert,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row justify-center items-center ">
      <div
        className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        px-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      "
      >
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default BottemBarItem;
