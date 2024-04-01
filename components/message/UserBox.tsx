// import axios from "axios";
import { useCallback, useState } from "react";
// import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

// import Avatar from "@/app/components/Avatar";
// import LoadingModal from "@/app/components/modals/LoadingModal";
import Avatar from "../Avatar";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);

    try {
      setIsLoading(true);

      await axios
        .post("/api/conversations", {
          data,
        })
        .then((data) => {
          router.push(`/conversations/${data.data.id}`);
        });

      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error creating conversation:", error);
    } finally {
      setIsLoading(false);
    }

    // axios
    //   .post("/api/conversations", { userId: data.id })
    //
    //   .catch((error) => {
    //     console.error("Error creating conversation:", error);
    //     // Handle error state or display error message to the user
    //   })
    //   .finally(() => setIsLoading(false));
  }, [data, router, setIsLoading]);
  return (
    <>
      {/* {isLoading && <LoadingModal />} */}
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
       
          p-3 
          border-b-[1px]
         
        
          transition
          cursor-pointer
        "
      >
        <Avatar userId={data.id} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium ">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
