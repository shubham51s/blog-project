import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Spinner from "../../Common/Spinner";
import { useRequestHandler } from "../../../hooks/requestHandler";

function MainSection({ publication }) {
  const { requestHandler } = useRequestHandler();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getFollowingUsers = async () => {
    try {
      const response = await requestHandler(`/publication/follow/users/${publication._id}`);
      const result = await response.json();

      console.log("users: ", result);
      if (response?.status === 200 && result?.data?.users) {
        setUsers(result.data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (publication && isLoading) {
      getFollowingUsers();
    }
  }, [publication]);

  return (
    <main className="grow shrink basis-auto width-20">
      {!isLoading && (
        <div className="min-h-full custom-bg-8">
          <div className="flex justify-center">
            <div className="w-full min-w-0 max-width-2 margin-12">
              <div className="margin56">
                <h2 className="letter-spacing-7 line-h-10 font-12 font-medium color-3 m-0">
                  {publication.stats.followers} {publication.stats.followers > 1 ? " followers" : " follower"}
                </h2>
              </div>

              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>

              <div>
                <ul className="p-0 list-none m-0">
                  {users.map((item) => (
                    <ListItem item={item} key={item._id} />
                  ))}
                </ul>
              </div>

              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}></div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="min-h-full custom-bg-8 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </main>
  );
}

export default MainSection;
