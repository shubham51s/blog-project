import { Dialog } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ListItem from "./ListItem";
import { useRequestHandler } from "../../../hooks/requestHandler";
import ListItemSkeleton from "./ListItem/skeleton";
import { defaultLoaderTime } from "../../../constants/constant";

function EditorsListModal({ handleCloseModal, publication }) {
  const { requestHandler } = useRequestHandler();
  const [editors, setEditors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loaderTimeout = useRef(null);
  const [initialLoader, setInitialLoader] = useState(true);

  const getPublicationEditors = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/publication/member/editors/${publication._id}?skip=${0}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.editors) {
        setEditors(result.data.editors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPublicationEditors();

    if (!loaderTimeout.current) {
      loaderTimeout.current = setTimeout(() => {
        loaderTimeout.current = null;
        setInitialLoader(false);
      }, defaultLoaderTime);
    }

    // return () => {
    //   clearTimeout(loaderTimeout.current);
    // };
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
            {/* list */}
            {!initialLoader && !isLoading && editors.map((item) => <ListItem key={item._id} item={item} />)}

            {/* list skeleton */}
            {(initialLoader || isLoading) && Array.from({ length: 3 }).map((_, index) => <ListItemSkeleton key={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorsListModal;
