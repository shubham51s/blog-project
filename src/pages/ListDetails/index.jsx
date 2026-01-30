import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRequestHandler } from "../../hooks/requestHandler";
import Skeleton from "react-loading-skeleton";
import { IoLockClosedSharp } from "react-icons/io5";
import { formatMonthAndDayLong } from "../../utils/monthDateLongFormatter";
import { PiHandsClappingLight } from "react-icons/pi";
import SaveList from "../../components/ListDetailsComp/SaveListButton";
import { UserContext } from "../../context/userContext";
import MoreButton from "../../components/ListDetailsComp/MoreButton";
import ListItem from "../../components/ListDetailsComp/List";
import { FaCommentSlash } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { showToast } from "../../utils/toaster";
import { PiHandsClappingFill } from "react-icons/pi";
import ListCommentDrawer from "../../components/ListDetailsComp/CommentDrawer";
import { Tooltip } from "@mui/material";
import NoData from "../../components/ListDetailsComp/NoData";

function ListDetailsPage() {
  const { username, listId } = useParams();
  const { userInfo } = useContext(UserContext);
  const { requestHandler } = useRequestHandler();
  const isCompMounted = useRef(null);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [listItems, setListItems] = useState([]);
  const addClapTimeout = useRef(null);
  const clapsClickedCount = useRef(0);
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);
  const [isDefaultLoader, setIsDefaultLoader] = useState(true);
  const [clapDetails, setClapDetails] = useState({
    total: 0,
  });
  const [loaders, setLoaders] = useState({
    clapLoader: false,
  });

  const fetchListItems = async (listId, userId, skip) => {
    try {
      const response = await requestHandler(`/list/items/get/${listId}/${userId}?skip=${skip}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.listItems) {
        setListItems(result.data.listItems);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (isLoading) setIsLoading(false);
    }
  };

  const fetchListDetails = async () => {
    try {
      const response = await requestHandler(`/list/${listId}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.list) {
        setList(result.data.list);
        fetchListItems(result.data.list._id, result.data.list.user._id, 0);

        if (result.data.list.user.username !== username) setIsError(true);

        if (result.data.list?.myClaps) {
          setClapDetails((prev) => ({ ...prev, total: result.data.list.clapsCount }));
        }
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const addClaps = async () => {
    setLoaders((prev) => ({ ...prev, clapLoader: true }));
    try {
      const params = {
        listId: list._id,
        clapsCount: Math.min(clapsClickedCount.current, 50),
      };

      const response = await requestHandler("/list/claps/add", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result.clapsCount) {
        const updatedTotal = list.clapsCount - list.myClaps + result.clapsCount;
        setClapDetails((prev) => ({ ...prev, total: updatedTotal }));
        setList((prev) => ({ ...prev, clapsCount: updatedTotal, myClaps: result.clapsCount }));
      } else {
        setClapDetails((prev) => ({ ...prev, total: list.clapsCount }));
        showToast("Some error occured");
      }

      clapsClickedCount.current = 0;
      setLoaders((prev) => ({ ...prev, clapLoader: false }));
    } catch (err) {
      console.error(err);
      clapsClickedCount.current = 0;
      showToast("Some error occured");
      setClapDetails((prev) => ({ ...prev, total: list.clapsCount }));
      setLoaders((prev) => ({ ...prev, clapLoader: false }));
    }
  };

  const handleAddClapsBtnClick = () => {
    if (list.myClaps >= 50 || loaders.clapLoader) return;

    clapsClickedCount.current++;

    setClapDetails((prev) => {
      const newTotal = list.clapsCount - list.myClaps + Math.min(list.myClaps + clapsClickedCount.current, 50);
      return {
        ...prev,
        total: newTotal,
      };
    });

    if (addClapTimeout.current) clearTimeout(addClapTimeout.current);

    addClapTimeout.current = setTimeout(() => {
      addClaps();
    }, 800);
  };

  useEffect(() => {
    if (!isCompMounted.current) {
      isCompMounted.current = true;
      fetchListDetails();

      setTimeout(() => {
        setIsDefaultLoader(false);
      }, 400);
    }
  }, []);

  return (
    <>
      {isError && <div className="">Error</div>}
      {!isError && (
        <div className="grow shrink basis-auto width-17 box-border">
          <div className="flex flex-col min-h-screen custom-bg-8">
            {/* top section (profile) */}
            <div className="flex justify-center">
              <div className="min-w-0 w-full max-width-2 margin-12">
                <header className="margin55 margin54 block">
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      <div className="margin-3">
                        <Link to="" className="no-underline m-0 p-0 cursor-pointer">
                          {list && (
                            <div className="relative">
                              <img src={list.user.profileImg} alt={list.user.name} className="width-15 aspect-square rounded-full" />
                              <div className="absolute top-0 width-15 aspect-square rounded-full boxShadow7"></div>
                            </div>
                          )}
                          {!list && <Skeleton circle className="width-15 aspect-square rounded-full" />}
                        </Link>
                      </div>
                      <div>
                        <div className="line-h-8 font-10 color-3 font-normal">
                          <div className="flex items-center margin-19" style={{ marginTop: 0, marginInline: 0 }}>
                            {list && (
                              <Link to="" className="no-underline cursor-pointer m-0 p-0 font-medium">
                                {list.user.name}
                              </Link>
                            )}
                            {!list && <Skeleton width={100} height={18} />}
                          </div>
                        </div>
                        {list && (
                          <div className="flex items-center flex-wrap">
                            <p className="color-4 custom-fs-1 line20 m-0 font-normal">
                              <span className="">{formatMonthAndDayLong(list.createdAt)}</span>
                            </p>
                            <span className="margin-9" style={{ marginBlock: 0 }}>
                              .
                            </span>
                            <div>
                              <p className="color-4 custom-fs-1 line20 m-0 font-normal">{list.savedCount} stories</p>
                            </div>
                            {list.isPrivate && (
                              <div className="margin-9" style={{ marginRight: 0, marginBlock: 0 }}>
                                <div className="width68 aspect-square">
                                  <IoLockClosedSharp className="w-full h-full" />
                                </div>
                              </div>
                            )}
                            {!list.isPrivate && (
                              <span className="margin-9" style={{ marginBlock: 0 }}>
                                .
                              </span>
                            )}
                            {!list.isPrivate && (
                              <div>
                                <p className="color-4 custom-fs-1 line20 m-0 font-normal">{list.savedByUsersCount} saves</p>
                              </div>
                            )}
                          </div>
                        )}
                        {!list && <Skeleton width={110} height={11} />}
                      </div>
                    </div>
                  </div>
                </header>
              </div>
            </div>

            {/* bottom section */}
            <div>
              <div className="padding69">
                <div className="flex justify-center">
                  <div className="min-w-0 w-full max-width-2 margin-12">
                    <div className="padding-3" style={{ paddingTop: 0, paddingInline: 0 }}>
                      {list && <h2 className="letter-spacing10 line-clamp-2 height83 line21 font15 font-bold color-3 m-0">{list.name}</h2>}
                      {list?.description && (
                        <div className="custom-px-2 whitespace-pre-wrap" style={{ paddingBottom: 0, paddingInline: 0 }}>
                          <h2 className="height84 line-h-8 font-9 line-clamp-4 color-4 font-normal m-0">{list.description}</h2>
                        </div>
                      )}
                      {!list && (
                        <div className="max-w-full overflow-hidden">
                          <Skeleton width={220} height={30} />
                        </div>
                      )}
                    </div>
                    <div className="custom-margin-b-1">
                      <div className="flex justify-between padding50 padding84 m-0 bdr-5" style={{ borderInline: 0 }}>
                        {list && (
                          <div className="flex items-center">
                            <div className="margin-12" style={{ marginLeft: 0 }}>
                              <div className="flex items-center">
                                <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                                  {userInfo._id !== list.user._id && (
                                    <Tooltip placement="top" arrow title="Clap">
                                      <div onClick={handleAddClapsBtnClick} className="width-13 cursor-pointer aspect-square opacity-[0.95] transition-all duration-75 ease hover:opacity-100">
                                        {!list.myClaps > 0 && <PiHandsClappingLight className="w-full h-full" />}
                                        {list.myClaps > 0 && <PiHandsClappingFill className="w-full h-full" />}
                                      </div>
                                    </Tooltip>
                                  )}
                                  {userInfo._id === list.user._id && (
                                    <div className="width-13 aspect-square cursor-not-allowed opacity-[0.95]">
                                      <Tooltip placement="top" arrow title="You cannot applaud your own story">
                                        <PiHandsClappingLight className="w-full h-full" />
                                      </Tooltip>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  {clapDetails?.total > 0 && (
                                    <p className="font-4 color-3 line20 font-normal m-0 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
                                      <button className="text-left cursor-pointer m-0 p-0">{clapDetails.total}</button>
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <div className="select-none margin-19 relative" style={{ marginLeft: 0, marginBlock: 0 }}>
                                  {!list.isPrivate && list.allowComments && (
                                    <div className="width-13 aspect-square flex items-center justify-center">
                                      <div onClick={() => setIsCommentDrawerOpen((prev) => !prev)} id="listCommentBtn" className="w-[85%] aspect-square cursor-pointer opacity-[0.85] transition-all duration-75 ease hover:opacity-100">
                                        <Tooltip placement="top" arrow title="Respond">
                                          <FaRegComment className="w-full h-full" />
                                        </Tooltip>
                                      </div>
                                    </div>
                                  )}
                                  {(!list.allowComments || list.isPrivate) && (
                                    <div className="width-13 aspect-square cursor-not-allowed opacity-50">
                                      <Tooltip placement="top" arrow title={list.isPrivate ? "Responses are disabled for private lists." : "Responses hidden"}>
                                        <FaCommentSlash className="w-full h-full" />
                                      </Tooltip>
                                    </div>
                                  )}
                                </div>
                                {list.allowComments && list.commentCount > 0 && (
                                  <div>
                                    <p className="font-4 color-3 line20 font-normal m-0 opacity-[0.8] transition-all duration-75 ease hover:opacity-100">
                                      <button className="text-left cursor-pointer m-0 p-0">{list.commentCount}</button>
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {list && (
                          <div className="flex items-center">
                            {!list.isPrivate && list.user._id !== userInfo._id && <SaveList list={list} />}

                            <MoreButton list={list} setList={setList} fetchListDetails={fetchListDetails} setClapDetails={setClapDetails} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* list items loader */}
                {(isLoading || isDefaultLoader) && (
                  <div className="flex justify-center margin-28" style={{ marginInline: 0 }}>
                    <div className="width-31 aspect-square bdr21 custom-bdr-3 animate-spin rounded-full" style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}></div>
                  </div>
                )}

                {/* no data */}
                {!isLoading && !isDefaultLoader && listItems.length === 0 && <NoData />}

                {/* list items */}
                {!isLoading && !isDefaultLoader && listItems.length > 0 && listItems.map((item) => <ListItem item={item} list={list} key={item._id} setListItems={setListItems} />)}
              </div>
            </div>
          </div>
        </div>
      )}
      {isCommentDrawerOpen && <ListCommentDrawer setIsCommentDrawerOpen={setIsCommentDrawerOpen} list={list} setList={setList} />}
    </>
  );
}

export default ListDetailsPage;
