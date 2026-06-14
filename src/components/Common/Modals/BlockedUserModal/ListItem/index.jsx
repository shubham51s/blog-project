import React, { useState } from "react";
import { useRequestHandler } from "../../../../../hooks/requestHandler";
import { showToast } from "../../../../../utils/toaster";

function ListItem({ item }) {
  const { requestHandler } = useRequestHandler();
  const [user, setUser] = useState(item);
  const [isLoading, setIsLoading] = useState(false);

  const unblockUser = async () => {
    setIsLoading(true);
    try {
      const params = {
        userId: user.blockedUser._id,
      };
      const response = await requestHandler("/user/block/unblock", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setUser(null);
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {user && (
        <div className="flex items-start margin60 first:!mt-0">
          <div className="relative shrink-0">
            <img src={user.blockedUser.profileImg} className="width-15 aspect-square rounded-full" />
            <div className="absolute top-0 width-15 aspect-square rounded-full boxShadow7"></div>
          </div>
          <div className="grow shrink basis-auto margin-12">
            <div className="flex items-center">
              <h2 className="font-10 font-medium color-3 line20 m-0">{user.blockedUser.name}</h2>
            </div>
            {user.blockedUser?.bio && (
              <div className="break-words whitespace-pre-wrap margin-19" style={{ marginBottom: 0, marginInline: 0 }}>
                <p className="color-4 line20 font-normal m-0 custom-fs-1">{user.blockedUser.bio}</p>
              </div>
            )}
          </div>
          <button onClick={unblockUser} className="shrink-0 cursor-pointer border-radius-9 bdr-3 border-[#1a8917] text-[#1a8917] text-center font-4 line20 font-normal padding85 padding-19">
            Blocked
          </button>
        </div>
      )}
    </>
  );
}

export default ListItem;
