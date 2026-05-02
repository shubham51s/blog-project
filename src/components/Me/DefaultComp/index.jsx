import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

function MePageDefaultComp() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/profile/${userInfo.username}`);
  }, []);

  return <div></div>;
}

export default MePageDefaultComp;
