import { Dialog } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ListItem from "./ListItem";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListItemSkeleton from "./ListItem/skeleton";
import { defaultLoaderTime } from "../../../constants/constant";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

function EditorsListModal({ handleCloseModal, publication }) {
  const { requestHandler } = useRequestHandler();
  const limit = 20;
  const [editors, setEditors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loaderTimeout = useRef(null);
  const [initialLoader, setInitialLoader] = useState(true);
  const [scroll, setScroll] = useState({
    loading: false,
    hasMore: true,
    cursor: null,
  });

  const getPublicationEditors = async () => {
    if (!scroll.hasMore) return;
    setScroll((prev) => ({ ...prev, loading: true }));

    try {
      const url = scroll.cursor ? `/publication/member/editors/${publication._id}?cursor=${scroll.cursor}&limit=${limit}` : `/publication/member/editors/${publication._id}?limit=${limit}`;
      const response = await requestHandler(url);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.editors) {
        setEditors((prev) => [...prev, ...result.data.editors]);
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
    loadMore: getPublicationEditors,
    hasMore: scroll.hasMore,
    scrollLoader: scroll.loading,
  });

  useEffect(() => {
    getPublicationEditors();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        setInitialLoader(false);
      }, defaultLoaderTime);
    }
  }, []);

  return (
    <div onClick={handleCloseModal} className="fixed bottom-0 top-0 left-0 right-0 z-[800] flex items-center justify-center overflow-x-hidden overflow-y-auto scroll-smooth bg13">
      <div onClick={(e) => e.stopPropagation()} className="padding71 padding91 m-auto">
        <div className="width-3">
          <div className="flex items-center justify-between padding71" style={{ paddingTop: 0 }}>
            <h2 className="font-12 font-medium color-3 m-0 letter-spacing-7 line-h-10">Editors</h2>
            <div className="relative">
              <button onClick={handleCloseModal} className="cursor-pointer m-0 p-0 flex color-3 opacity-[0.65] transition-all duration-75 ease hover:opacity-[0.85]">
                <div className="width58 aspect-square">
                  <IoCloseOutline className="w-full h-full" />
                </div>
              </button>
            </div>
          </div>

          <div>
            {!initialLoader && !isLoading && (
              <>
                {editors.map((item) => (
                  <ListItem key={item._id} item={item} />
                ))}
                {scroll.hasMore && <div ref={sentinel} style={{ height: "1px" }}></div>}
              </>
            )}

            {/* list skeleton */}
            {(initialLoader || isLoading) && Array.from({ length: 3 }).map((_, index) => <ListItemSkeleton key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorsListModal;
