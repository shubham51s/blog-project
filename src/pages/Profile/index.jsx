import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useRequestHandler } from "../../hooks/requestHandler";

function ProfilePage() {
  const { username } = useParams();
  const { requestHandler } = useRequestHandler();
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  const fetchUserDetails = async () => {
    try {
      if (!username) {
        setIsError(true);
        return;
      }

      const response = await requestHandler(`/users/${username}`);

      const result = await response.json();

      if (response?.status === 200) setUser(result?.data?.user || null);
      else setIsError(true);

      console.log("user result: ", result);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Outlet context={{ user, isError }} />
    </>
  );
}

export default ProfilePage;
