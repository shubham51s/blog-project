import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Homepage() {
  const { userData } = useContext(UserContext);
  return <div className="">Welcome to my Homepage, this is my very first page {{ userData }}</div>;
}

export default Homepage;
