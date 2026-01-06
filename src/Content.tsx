import React from "react";
import { useParams } from "react-router";
function Content() {
  const { name } = useParams();
  return <h1>{name}</h1>;
}

export default Content;
