import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog, Slide } from "@mui/material";
import { MdClose } from "react-icons/md";
import { defaultLoaderTime } from "../../../../constants/constant";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import ListItem from "./ListItem";
import Spinner from "../../Spinner";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

function BlockedUserModal({ isShowModal, handleCloseModal }) {
  const { requestHandler } = useRequestHandler();
  const loaderTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultLoader, setDefaultLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getBlockedUsers = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));
    try {
      const url = scroll.cursor ? `/user/block/get-blocked-users?cursor=${scroll.cursor}&limit=${20}` : `/user/block/get-blocked-users?limit=${20}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.users) {
        setUsers((prev) => [...prev, ...result.data.users]);
        setScroll((prev) => ({ ...prev, cursor: result.data.cursor || null, hasMore: result.data.cursor ? true : false }));
      } else {
        setScroll((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (err) {
      console.error(err);
      setScroll((prev) => ({ ...prev, hasMore: false }));
    } finally {
      setIsLoading(false);
      setScroll((prev) => ({ ...prev, loading: false }));
    }
  };

  const sentinel = useInfiniteScroll({
    loadMore: getBlockedUsers,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

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
      transitionDuration={500}
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
              {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
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
