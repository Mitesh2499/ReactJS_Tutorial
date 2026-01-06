import React from "react";
import Child2 from "./Child2";

function Child1({ children, data }) {
  return (
    <div>
      <h1>Child 1</h1>
      {data}
      {children}
    </div>
  );
}

export default Child1;
