import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineTopic } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { Link } from "react-router-dom";

function SearchHomeComp() {
  const { requestHandler } = useRequestHandler();
  const [searchInput, setSearchInput] = useState("");
  const [isShowSearchPopup, setIsShowSearchPopup] = useState(false);
  const inputRef = useRef();
  const inputResultRef = useRef();
  const searchTimeout = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    users: [],
    publications: [],
    topics: [],
  });
  const [searchedListResult, setSearchedListResult] = useState({
    people: [
      {
        id: 0,
        name: "Teressa Pence Morr",
        image: "https://miro.medium.com/v2/resize:fill:30:30/1*yWQSXi7DUTz3mnjCCTVrCw.jpeg",
      },
      {
        id: 1,
        name: "People result 2",
        image: "https://miro.medium.com/v2/resize:fill:30:30/1*4yjKwtSb_VjZyo2h-N6lYw.jpeg",
      },
      {
        id: 2,
        name: "People result 3",
        image: "https://miro.medium.com/v2/resize:fill:30:30/1*rMshsyWaO5CA_744A1ZIrA.png",
      },
    ],
    publications: [
      {
        id: 0,
        name: "publications first result",
        image: "",
      },
      {
        id: 1,
        name: "publications second result",
        image: "",
      },
      {
        id: 2,
        name: "publications third result",
        image: "",
      },
    ],
    topics: [
      {
        id: 0,
        name: "topics first result",
      },
      {
        id: 1,
        name: "topics second result",
      },
      {
        id: 2,
        name: "topics third result",
      },
    ],
  });

  const handleSearch = async (search) => {
    let users = [];
    let publications = [];
    let topics = [];

    try {
      const response = await requestHandler(`/users/search/common?search=${search}`);
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

    console.log("publications: ", publications, " topics: ", topics);
    setSearchData((prev) => ({ ...prev, users, publications, topics }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.length) {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        handleSearch(value);
        searchTimeout.current = null;
      }, 1000);
    }
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target) && inputResultRef.current && !inputResultRef.current.contains(e.target)) {
      setIsShowSearchPopup(false);
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
        <input value={searchInput} onChange={(e) => handleInputChange(e)} onFocus={() => setIsShowSearchPopup(true)} ref={inputRef} className="color-3 bg-transparent padding-12 custom-fs-1 border-0 outline-none custom-line-h-1 w-full m-0 font-medium" type="text" placeholder="Search" />

        {/* search results popup */}
        {isShowSearchPopup && (
          <div ref={inputResultRef} className="absolute translate-x-0 z-[9999] top-1 box-shadow-1 border-radius-3">
            <div className="custom-bg-8 border-radius-4 overflow-hidden">
              <div id="searchResults" className="width-12">
                {searchInput.length > 0 && (
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
                        <div className="margin-7 margin-15 flex flex-col justify-between" style={{ marginInline: 0 }}>
                          {searchData.users.map((item) => (
                            <li className="padding-14 padding-15 flex box-border margin-7" key={item._id} style={{ paddingBlock: 0, marginInline: 0, marginTop: 0 }}>
                              {/* <li className={`padding-14 padding-15 flex box-border ${index >= 2 ? "" : "margin-7"}`} key={index} style={{ paddingBlock: 0, marginInline: 0, marginTop: 0 }}> */}
                              <Link to={`/profile/${item.username}`} className="cursor-pointer m-0 p-0 no-underline">
                                <div className="flex items-center">
                                  <div className="width-13 aspect-square">
                                    <img className="w-full h-full bg-11 box-border rounded-full align-middle" src={item.profileImg} />
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
                        <div className="margin-7 margin-15 flex flex-col justify-between" style={{ marginInline: 0 }}>
                          {searchData.publications.map((item) => (
                            <li className="padding-14 padding-15 flex box-border margin-7" key={item._id} style={{ paddingBlock: 0, marginInline: 0, marginTop: 0 }}>
                              <Link to={`/publication/${item.slug}`} className="cursor-pointer m-0 p-0 no-underline">
                                <div className="flex items-center">
                                  <div className="width-13 aspect-square">
                                    <img className="w-full h-full bg-11 box-border rounded-full align-middle" src={item.profileImg} />
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
                        <div className="margin-7 margin-15 flex flex-col justify-between" style={{ marginInline: 0 }}>
                          {searchData.topics.map((item) => (
                            <li className="padding-14 padding-15 flex box-border margin-7" key={item._id} style={{ paddingBlock: 0, marginInline: 0, marginTop: 0 }}>
                              <a href="#" className="cursor-pointer m-0 p-0 no-underline">
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
                              </a>
                            </li>
                          ))}
                        </div>
                      </>
                    )}
                  </ul>
                )}

                {/* explore section */}
                {searchInput.length === 0 && (
                  <ul className="flex flex-col items-stretch p-0 m-0 list-image-none list-none">
                    <div className="margin-17 margin-18">
                      <div className="flex items-center">
                        <div className="flex-auto">
                          <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                            <div className="flex items-center">
                              <div className="margin-3 flex-none">
                                <MdOutlineExplore className="width-13 aspect-square color-6 align-middle transition-all duration-300 ease-in-out opacity-75 hover:opacity-100" />
                              </div>
                              <p className="break-words text-ellipsis height-6 overflow-hidden color-3 custom-fs-1 custom-line-h-1 font-medium m-0 p-0">Explore topics</p>
                            </div>
                          </a>
                        </div>
                        <div className="flex-none">
                          <a href="#" className="cursor-pointer no-underline m-0 p-0">
                            <div className="width-13 aspect-square margin-5 flex justify-center items-center">
                              <GoArrowUpRight className="width-13 aspect-square color-6 align-middle transition-all duration-300 ease-in-out opacity-75 hover:opacity-100" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchHomeComp;
