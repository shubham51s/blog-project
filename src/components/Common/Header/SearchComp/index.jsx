import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineTopic } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { Link, useNavigate } from "react-router-dom";
import { urlBasePath } from "../../../../constants/constant";
import ExploreSection from "./ExploreSection";

function SearchHomeComp() {
  const { requestHandler } = useRequestHandler();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [isShowSearchPopup, setIsShowSearchPopup] = useState(false);
  const inputRef = useRef();
  const inputResultRef = useRef();
  const searchTimeout = useRef(null);
  const controllerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    users: [],
    publications: [],
    topics: [],
  });

  const closePopup = () => {
    setIsShowSearchPopup(false);
  };

  const handleSearch = async (search) => {
    let users = [];
    let publications = [];
    let topics = [];

    try {
      // abort previous request
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      // create new controller
      const controller = new AbortController();
      controllerRef.current = controller;

      const response = await fetch(`${urlBasePath}/users/search/common?search=${search}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "GET",
        signal: controller.signal,
      });

      if (response?.status === 401) {
        window.location.reload();
        return;
      }

      const result = await response.json();

      if (response?.status === 200 && result?.data) {
        if (result.data.users?.length) {
          users = result.data.users;
        }
        if (result.data.publications?.length) {
          publications = result.data.publications;
        }
        if (result.data.topics?.length) {
          topics = result.data.topics;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    setSearchData((prev) => ({ ...prev, users, publications, topics }));

    if (!users.length && !publications.length && !topics.length) {
      closePopup();
    } else {
      setIsShowSearchPopup(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.length) {
      setIsLoading(false);
      setSearchData({ users: [], publications: [], topics: [] });
      setIsShowSearchPopup(true);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    } else {
      setIsLoading(true);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        handleSearch(value);
        searchTimeout.current = null;
      }, 500);
    }
  };

  const handleInputFocus = () => {
    if (!searchInput.length || searchData.users.length || searchData.publications.length || searchData.topics.length) {
      setIsShowSearchPopup(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      setIsLoading(false);

      if (searchInput) {
        let oldArr = [];
        if (localStorage.getItem("search-history")) {
          if (JSON.parse(localStorage.getItem("search-history"))?.length) {
            oldArr = JSON.parse(localStorage.getItem("search-history"));
            if (oldArr.includes(searchInput)) {
              oldArr = oldArr.filter((item) => item !== searchInput);
            }
          }
        }

        const newArr = [searchInput, ...oldArr];
        localStorage.setItem("search-history", JSON.stringify(newArr.slice(0, 10)));
      }

      searchInput ? navigate(`/search/posts?q=${searchInput}`) : navigate(`/search?q=${searchInput}`);

      closePopup();
    }
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target) && inputResultRef.current && !inputResultRef.current.contains(e.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="margin-12 mr-0">
      <div className="bg-10 width-9 border-radius-2 border-0 flex items-center relative">
        <div className="margin-13">
          <div className="width-10 aspect-square overflow-hidden flex items-center justify-center">
            {!isLoading && <CiSearch className="w-full h-full" />}
            {isLoading && <div className="w-[80%] h-[80%] rounded-full animate-spin bdr-7" style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}></div>}
          </div>
        </div>
        <input value={searchInput} onChange={(e) => handleInputChange(e)} onFocus={() => handleInputFocus()} onKeyDown={(e) => handleKeyPress(e)} ref={inputRef} spellCheck={false} className="color-3 bg-transparent padding-12 custom-fs-1 border-0 outline-none custom-line-h-1 w-full m-0 font-medium" type="text" placeholder="Search" />

        {/* search results popup */}
        {isShowSearchPopup && (
          <div ref={inputResultRef} className="absolute translate-x-0 z-[9999] top-1 box-shadow-1 border-radius-3">
            <div className="custom-bg-8 border-radius-4 overflow-hidden">
              <div id="searchResults" className="width-12">
                {searchInput.length > 0 && (searchData.users.length > 0 || searchData.publications.length || searchData.topics.length > 0) && (
                  <ul className="padding-13 flex flex-col items-stretch list-none m-0" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    {/* People list result */}
                    {searchData.users.length > 0 && (
                      <>
                        <div className="padding-14 w-full" style={{ paddingBlock: 0 }}>
                          <div className="margin-16" style={{ marginTop: 0, marginInline: 0 }}>
                            <p className="uppercase line-h-7 letter-spacing-5 font-4 color-4 font-normal m-0 p-0">People</p>
                          </div>
                          <li className="py-0 block">
                            <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                          </li>
                        </div>
                        <div className="margin-7 margin-15 flex flex-col justify-between last:!mb-0" style={{ marginInline: 0 }}>
                          {searchData.users.map((item) => (
                            <li className="padding-14 padding-15 flex box-border margin-7 last:!mb-0" key={item._id} style={{ paddingBlock: 0, marginInline: 0, marginTop: 0 }}>
                              {/* <li className={`padding-14 padding-15 flex box-border ${index >= 2 ? "" : "margin-7"}`} key={index} style={{ paddingBlock: 0, marginInline: 0, marginTop: 0 }}> */}
                              <Link to={`/profile/${item.username}`} onClick={closePopup} className="cursor-pointer m-0 p-0 no-underline">
                                <div className="flex items-center">
                                  <div className="width-13 aspect-square">
                                    <img loading="lazy" className="w-full h-full bg-11 box-border rounded-full align-middle" src={item.profileImg} />
                                  </div>
                                  <div className="margin-9" style={{ marginRight: 0, marginBlock: 0 }}>
                                    <div className="flex">
                                      <div className="flex-1">
                                        <div className="color-3 custom-fs-1 custom-line-h-1 font-normal">
                                          <div className="color-3 custom-fs-1 font-normal custom-line-h-1 m-0 p-0">
                                            <div className="width-14 text-left text-ellipsis overflow-hidden whitespace-nowrap font-medium">{item.name}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </div>
                      </>
                    )}

                    {/* publication list result */}
                    {searchData.publications.length > 0 && (
                      <>
                        <div className="padding-14 w-full" style={{ paddingBlock: 0 }}>
                          <div className="margin-16" style={{ marginTop: 0, marginInline: 0 }}>
                            <p className="uppercase line-h-7 letter-spacing-5 font-4 color-4 font-normal m-0 p-0">Publications</p>
                          </div>
                          <li className="py-0 block">
                            <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                          </li>
                        </div>
                        <div className="margin-7 margin-15 flex flex-col justify-between last:!mb-0" style={{ marginInline: 0 }}>
                          {searchData.publications.map((item) => (
                            <li className="padding-14 padding-15 flex box-border margin-7 last:!mb-0" key={item._id} style={{ paddingBlock: 0, marginInline: 0, marginTop: 0 }}>
                              <Link to={`/publication/${item.slug}`} onClick={closePopup} className="cursor-pointer m-0 p-0 no-underline">
                                <div className="flex items-center">
                                  <div className="width-13 aspect-square">
                                    <img loading="lazy" className="w-full h-full bg-11 box-border rounded-full align-middle" src={item.profileImg} />
                                  </div>
                                  <div className="margin-9" style={{ marginRight: 0, marginBlock: 0 }}>
                                    <div className="flex">
                                      <div className="flex-1">
                                        <div className="color-3 custom-fs-1 custom-line-h-1 font-normal">
                                          <div className="color-3 custom-fs-1 font-normal custom-line-h-1 m-0 p-0">
                                            <div className="width-14 text-left text-ellipsis overflow-hidden whitespace-nowrap font-medium">{item.name}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </div>
                      </>
                    )}

                    {/* topic list result */}
                    {searchData.topics.length > 0 && (
                      <>
                        <div className="padding-14 w-full" style={{ paddingBlock: 0 }}>
                          <div className="margin-16" style={{ marginTop: 0, marginInline: 0 }}>
                            <p className="uppercase line-h-7 letter-spacing-5 font-4 color-4 font-normal m-0 p-0">Topics</p>
                          </div>
                          <li className="py-0 block">
                            <div className="bdr-5" style={{ borderBottom: 0, borderInline: 0 }}></div>
                          </li>
                        </div>
                        <div className="margin-7 margin-15 flex flex-col justify-between last:!mb-0" style={{ marginInline: 0 }}>
                          {searchData.topics.map((item) => (
                            <li className="padding-14 padding-15 flex box-border margin-7 last:!mb-0" key={item._id} style={{ paddingBlock: 0, marginInline: 0, marginTop: 0 }}>
                              <Link to={`/tag/${item.slug}`} onClick={closePopup} className="cursor-pointer m-0 p-0 no-underline">
                                <div className="flex items-center">
                                  <div className="width-13 aspect-square">
                                    <MdOutlineTopic className="w-full h-full bg-11 box-border rounded-full align-middle" src="https://miro.medium.com/v2/resize:fill:30:30/1*T5BNQkG7KKzsXhyfRyJkNA.jpeg" />
                                  </div>
                                  <div className="margin-9" style={{ marginRight: 0, marginBlock: 0 }}>
                                    <div className="flex">
                                      <div className="flex-1">
                                        <div className="color-3 custom-fs-1 custom-line-h-1 font-normal">
                                          <div className="color-3 custom-fs-1 font-normal custom-line-h-1 m-0 p-0">
                                            <div className="width-14 text-left text-ellipsis overflow-hidden whitespace-nowrap font-medium">{item.name}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </div>
                      </>
                    )}
                  </ul>
                )}

                {/* explore section */}
                {(searchInput.length === 0 || (isLoading && searchData.users.length === 0 && searchData.publications.length === 0 && searchData.topics.length === 0)) && <ExploreSection closePopup={closePopup} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchHomeComp;
