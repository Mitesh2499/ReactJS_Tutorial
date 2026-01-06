import React from "react";
import { useSearchParams } from "react-router";
function Search() {
  // url?query=
  const [params] = useSearchParams();
  console.log(params);

  let keyword = params.get("keyword");
  let query = params.get("query");
  return (
    <div>
      Search
      <p>{keyword}</p>
      <p>{query}</p>
    </div>
  );
}

export default Search;
