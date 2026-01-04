import React, { useEffect, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useRequestHandler } from "../../hooks/requestHandler";

function ProfilePage() {
  const { username } = useParams();
  const { requestHandler } = useRequestHandler();
  const [user, setUser] = useState();
  const [loaders, setLoaders] = useState({
    fetchUserLoader: true,
  });
  const [isError, setIsError] = useState(false);

  const fetchUserDetails = async (user) => {
    setLoaders((prev) => ({ ...prev, fetchUserLoader: true }));
    try {
      const userName = user.split("@").length > 1 ? user.split("@")[1] : null;

      if (!userName) {
        setIsError(true);
        return;
      }

      const response = await requestHandler(`/users/${userName}`);

      const result = await response.json();

      setLoaders((prev) => ({ ...prev, fetchUserLoader: false }));

      if (response?.status === 200) {
        setUser(result?.data?.user || {});
      } else {
        setIsError(true);
      }

      console.log("result: ", result);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setLoaders((prev) => ({ ...prev, fetchUserLoader: false }));
    }
  };

  useEffect(() => {
    fetchUserDetails(username);
  }, []);

  return (
    <>
      <Outlet context={{ user, isError, loaders }} />
    </>
  );
}

export default ProfilePage;
