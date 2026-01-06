import React from "react";
import { Link, Outlet } from "react-router";

function Dashboard() {
  return (
    <div>
      Dashboard
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
          <Link to="profile">Profile</Link>
        </h5>

        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
