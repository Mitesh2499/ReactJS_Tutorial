import React from "react";
import { useParams } from "react-router";

function MovieDetail() {
  const { name } = useParams();
  return (
    <div>
      MovieDetail
      <h1>{name}</h1>
    </div>
  );
}

export default MovieDetail;
