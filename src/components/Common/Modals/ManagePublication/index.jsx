import React, { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import PublicationListItem from "./PublicationListItem";
import Spinner from "../../Spinner";

function ManagePublication({ isShowModal, handleCloseModal }) {
  const { requestHandler } = useRequestHandler();
  const limit = 10;
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getMyContributedPublications = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/publication/my-contributions?cursor=${scroll.cursor}&limit=${limit}` : `/publication/my-contributions?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publications?.length) {
        setPublications((prev) => [...prev, ...result.data.publications]);
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
    loadMore: getMyContributedPublications,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    getMyContributedPublications();
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
      <div className="width60 boxShadow6 padding70 relative border-radius-3 custom-bg-8">
        <div className="text-center">
          <h2 className="font-3 line-h-8 font-semibold color-3 m-0">Manage publications</h2>
        </div>

        <div className="margin51 invisible-scrollbar height69 flex flex-col">
          <Link to="/new-publication" className="shrink-0 cursor-pointer m-0 p-0">
            <div className="text-[#1A8917] custom-fs-1 line20 font-normal m-0 flex items-center">
              <div className="width84 aspect-square margin-3">
                <GoPlus className="w-full h-full" />
              </div>
              <span className="inline-block">Create a new publication</span>
            </div>
          </Link>

          {!isLoading && (
            <>
              {publications.length > 0 && (
                <>
                  {publications.map((item) => (
                    <PublicationListItem item={item} key={item._id} />
                  ))}
                  {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
                </>
              )}

              {publications.length === 0 && (
                <>
                  <div className="margin-17 shrink-0">
                    <div className="h-0 w-full bdr-5" style={{ borderTop: 0, borderInline: 0 }}></div>
                  </div>
                  <p className="grow color-4 custom-fs-1 line20 font-normal m-0 flex items-start justify-center">You don't belong to any publications.</p>
                </>
              )}
            </>
          )}

          {isLoading && (
            <div className="grow flex items-center justify-center" style={{ marginInline: 0 }}>
              <Spinner />
            </div>
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

export default ManagePublication;
