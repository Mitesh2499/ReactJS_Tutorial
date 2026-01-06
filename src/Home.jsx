import React from "react";
import { Link } from "react-router";
function Home() {
  return (
    <div>
      <h5>
        <Link to="/">Home</Link>
      </h5>
      <h5>
        {" "}
        <Link to="/about">About</Link>
      </h5>
      <h5>
        {" "}
        <Link to="/movie">movie</Link>
      </h5>
      <h5>
        {" "}
        <Link to="/content/avatar">Content</Link>
      </h5>
      <h5>
        {" "}
        <Link to="/search?keyword=iphone&query=abc">Search</Link>
      </h5>
      <h5>
        {" "}
        <Link to="/login">Login</Link>
      </h5>
    </div>
  );
}

export default Home;
