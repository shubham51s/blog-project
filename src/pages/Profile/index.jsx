import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useRequestHandler } from "../../hooks/requestHandler";

function ProfilePage() {
  const { username } = useParams();
  const { requestHandler } = useRequestHandler();
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  const fetchUserDetails = async (user) => {
    try {
      const userName = user.split("@").length > 1 ? user.split("@")[1] : null;

      if (!userName) {
        setIsError(true);
        return;
      }

      const response = await requestHandler(`/users/${userName}`);

      const result = await response.json();

      if (response?.status === 200) setUser(result?.data?.user || {});
      else setIsError(true);

      console.log("result: ", result);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchUserDetails(username);
  }, []);

  return (
    <>
      <Outlet context={{ user, isError }} />
    </>
  );
}

export default ProfilePage;
