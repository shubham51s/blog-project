import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import { defaultLoaderTime } from "../../../../constants/constant";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import ListItem from "./ListItem";
import Spinner from "../../Spinner";

function BlockedUserModal({ isShowModal, handleCloseModal }) {
  const { requestHandler } = useRequestHandler();
  const loaderTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [users, setUsers] = useState([]);

  const getBlockedUsers = async () => {
    try {
      const response = await requestHandler("/user/block/get-blocked-users");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.users) {
        setUsers(result.data.users);
      }

      console.log("result: ", result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlockedUsers();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setDefaultLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <Dialog
      open={isShowModal}
      onClose={handleCloseModal}
      PaperProps={{
        sx: {
          maxWidth: "none",
          width: "auto",
          margin: 0,
          boxShadow: "none",
          backgroundImage: "none",
          overflow: "visible",
        },
      }}
    >
      <div className="width60 boxShadow6 padding70 relative border-radius-3 custom-bg-8 max-h-screen overflow-y-auto">
        <div className="text-center">
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Blocked users</h2>
        </div>
        <div className="margin60">
          <p className="color-3 custom-fs-1 line20 font-normal m-0">Blocked users will be removed from your feed and email digests, and you won't see them in the future.</p>
        </div>
        <div className="margin51">
          {(isLoading || defaultLoader) && (
            <div className="w-full flex justify-center">
              <Spinner />
            </div>
          )}
          {!isLoading && !defaultLoader && users.length === 0 && <p className="color-4 custom-fs-1 line20 font-normal m-0">You are not blocking any users.</p>}
          {!isLoading && !defaultLoader && users.length > 0 && (
            <>
              {users.map((item) => (
                <ListItem item={item} key={item._id} />
              ))}
            </>
          )}
        </div>

        <div className="absolute right5 top6">
          <button onClick={handleCloseModal} className="cursor-pointer m-0 p-0 flex color-3 opacity-[0.6] transition-all duration-75 ease hover:opacity-[0.8]">
            <div className="width-13 aspect-square">
              <MdClose className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default BlockedUserModal;
