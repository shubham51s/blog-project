import React, { useEffect, useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useRequestHandler } from "../../hooks/requestHandler";

function ProfilePage() {
  const { username } = useParams();
  const { requestHandler } = useRequestHandler();
  const [userDetails, setUserDetails] = useState(null);
  const [isError, setIsError] = useState(false);
  const isCompMounted = useRef(null);

  const fetchUserDetails = async () => {
    try {
      if (!username) {
        setIsError(true);
        return;
      }

      const response = await requestHandler(`/users/${username}`);

      const result = await response.json();

      console.log("user details: ", result.data.user);

      if (response?.status === 200) setUserDetails(result?.data?.user || null);
      else setIsError(true);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (!isCompMounted.current) {
      isCompMounted.current = true;
      fetchUserDetails();
    }
  }, []);

  return (
    <>
      <Outlet context={{ userDetails, isError }} />
    </>
  );
}

export default ProfilePage;
