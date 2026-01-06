import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Movie from "./Moive.jsx";
import { Route, Routes } from "react-router";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Airport from "./Airport.jsx";
import Content from "./Content.js";
import Search from "./Search.js";
import MovieDetail from "./MovieDetail.jsx";
import NotFound from "./NotFound.jsx";
import Dashboard from "./Dashboard.jsx";
import Profile from "./Profile.jsx";
import Login from "./components/Login.jsx";
import TodoApp from "./components/TodoApp.jsx";
import Register from "./components/RegisterWithAPI.jsx";
import { ToastContainer } from "react-toastify";
import LoginWithAPI from "./components/LoginWithAPI.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
function App() {
  return (
    <>
      {/* <h1>Routing</h1> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <TodoApp />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginWithAPI />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        <Route
          path="/movie"
          element={
            <ProtectedRoutes>
              <Movie />
            </ProtectedRoutes>
          }
        />
        <Route path="/movie/:name" element={<MovieDetail />} />
        {/* <Route path="/airport" element={<Airport />} /> */}
        <Route path="/content/:name" element={<Content />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="bottom-right" theme="dark" />
    </>
    // <div>
    //   <Movie/>
    // </div>
  );
}

export default App;
