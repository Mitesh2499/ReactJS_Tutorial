import React, { useEffect } from "react";
import { getCurrentUser } from "./services/authService";
import Child1 from "./Child1";
import Child2 from "./Child2";

function About() {
  const getUser = async () => {
    try {
      const result = await getCurrentUser();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  //layout
  return (
    <div>
      <Child1 data="Hello From About Page">
        <Child2 data="This is Child 2 Data" />
        <h2>This is Child Content</h2>
        <h2>This is Child Content</h2>
        <h2>This is Child Content 2</h2>
      </Child1>
    </div>
  );
}

export default About;
