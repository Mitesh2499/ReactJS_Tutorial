import React, { useState } from "react";

function Search({ onSearch }) {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={(e) => {
        console.log(e);
        let val = e.target.value;
        setValue(val);
        onSearch(val);
      }}
      className="form-control mb-2"
      placeholder="Search movie..."
    />
  );
}

export default Search;
