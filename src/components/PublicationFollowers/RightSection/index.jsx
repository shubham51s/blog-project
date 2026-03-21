import React, { useContext, useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { PublicationContext } from "../../../context/publication";
import { useTogglePublicationFollow } from "../../../hooks/togglePublicationFollow";
import { useRequestHandler } from "../../../hooks/requestHandler";

function RightSection({ publication }) {
  const { requestHandler } = useRequestHandler();
  const { followingPublication, isPublicationLoader } = useContext(PublicationContext);
  const { followPublication, unfollowPublication } = useTogglePublicationFollow();
  const [isLoading, setIsLoading] = useState(false);
  const [editors, setEditors] = useState([]);
  const hasFetched = useRef(null);

  const handlePublicationFollow = async () => {
    setIsLoading(true);

    const params = {
      _id: publication._id,
      name: publication.name,
    };
    await followPublication(params);

    setIsLoading(false);
  };

  const handlePublicationUnfollow = async () => {
    setIsLoading(true);

    const params = {
      _id: publication._id,
      name: publication.name,
    };
    await unfollowPublication(params);

    setIsLoading(false);
  };

  const getPublicationEditors = async () => {
    try {
      const response = await requestHandler(`/publication/member/editors/${publication._id}?skip=${0}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.editors) {
        setEditors(result.data.editors);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (publication && !hasFetched.current) {
      getPublicationEditors();
      hasFetched.current = true;
    }
  }, [publication]);

  return (
    <>
      {publication && (
        <div className="width-22 width-21 padding-24 padding75 custom-bg-8 min-h-full bdr-5" style={{ borderRight: 0, borderBlock: 0 }}>
          <div className="relative inline-block w-full h-full">
            <div className="sticky top-2">
              <div className="min-h-full flex flex-col">
                <div className="grow shrink-0 basis-auto">
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                    <div className="padding-42">
                      <div className="relative">
                        <img src={publication.profileImg} alt={publication.name} className="width74 aspect-square rounded-full" />
                        <div className="absolute top-0 width74 aspect-square rounded-full boxShadow7"></div>
                      </div>
                    </div>
                    <div className="padding-42">
                      <p className="custom-fs-1 color-4 line20 font-normal m-0">
                        <span className="break-words">{publication.description}</span>
                      </p>
                    </div>
                    {!isPublicationLoader && (
                      <div className="padding-42">
                        {followingPublication[publication._id] && (
                          <button onClick={handlePublicationUnfollow} disabled={isLoading} className="bdr17-hover padding-38 padding-37 border-radius-8 cursor-pointer flex justify-center items-center m-0 transition-all duration-500 ease">
                            <span className="w-full font-normal color-3 custom-fs-1 line20">Following</span>
                          </button>
                        )}
                        {!followingPublication[publication._id] && (
                          <button onClick={handlePublicationFollow} disabled={isLoading} className="bdr-7 padding-38 padding-37 custom-bg-3 border-radius-8 cursor-pointer flex justify-center items-center m-0 transition-all duration-500 ease">
                            <span className="w-full font-normal color-2 custom-fs-1 line20">Follow</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                    <div>
                      <div className="padding-42">
                        <h2 className="font-10 color-3 line20 m-0 font-medium">Editors</h2>
                      </div>
                    </div>
                    <div>
                      {editors.map((item) => (
                        <ListItem item={item} key={item._id} />
                      ))}
                    </div>
                  </div>
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>
                  <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RightSection;
