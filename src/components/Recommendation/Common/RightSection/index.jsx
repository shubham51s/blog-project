import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { footerOptions } from "../../../../constants/constant";
import ListItem from "./ListItem";
import { useRequestHandler } from "../../../../hooks/requestHandler";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

function RightSection() {
  const { requestHandler } = useRequestHandler();
  const [users, setUsers] = useState([]);

  const fetchSuggestedUsers = async () => {
    try {
      const response = await requestHandler(`/users/suggestions?limit=3`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.users) {
        setUsers(result.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  return (
    <>
      {users?.length > 0 && (
        <div className="relative inline-block w-full h-full">
          <div className="sticky top2">
            <div className="height-14 flex flex-col">
              <div className="grow shrink-0 basis-auto">
                <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                  <div>
                    <div>
                      <div className="padding83">
                        <h2 className="font-10 font-semibold color-3 line20 m-0">Who to follow</h2>
                      </div>
                    </div>
                    <div>
                      {users.map((item) => (
                        <ListItem key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                  <div className="padding68">
                    <p className="custom-fs-1 color-4 line20 font-normal m-0 transition-all duration-75 ease hover:underline">
                      <Link to="/me/following/suggestions" className="cursor-pointer no-underline m-0 p-0">
                        See more suggestions
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="padding-3 flex flex-wrap">
                {footerOptions.map((item) => (
                  <div key={item.id} className="margin-24" style={{ marginLeft: 0, marginBlock: 0 }}>
                    <Link to={item.path} className="cursor-pointer m-0 p-0">
                      <p className="line-h-7 font-8 color-4 font-normal m-0">{item.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RightSection;
