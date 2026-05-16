import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchPage from ".";

function SearchPageWrapper() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");

  return <SearchPage key={search} />;
}

export default SearchPageWrapper;
