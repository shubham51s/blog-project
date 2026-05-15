import React from "react";
import ListItem from "./ListItem";
import ListLoader from "./ListItem/skeleton";

function PeopleSection() {
  return (
    <>
      {/* <ListItem /> */}
      {Array.from({ length: 6 }).map((_, i) => (
        <ListItem key={i} />
        // <ListLoader key={i} />
      ))}
    </>
  );
}

export default PeopleSection;
