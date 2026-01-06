import React, { useState } from "react";
import { getMovies, genres } from "./MoiveService/MoiveService";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router";
import Search from "./components/Search";

const Movies = () => {
  const [movies, setMovies] = useState(getMovies());
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const naviagate = useNavigate();

  // SORT STATE
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "asc",
  });

  //  LIKE
  const handleLike = (id) => {
    setMovies((prev) =>
      prev.map((m) => (m._id === id ? { ...m, liked: !m.liked } : m))
    );
  };

  // 🗑 DELETE
  const handleDelete = (id) => {
    setMovies((prev) => prev.filter((m) => m._id !== id));
  };

  // 🎭 GENRE FILTER
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // 🔍 SEARCH
  const handleSearch = (val) => {
    setSearchQuery(val);
    setSelectedGenre("All");
    setCurrentPage(1);
  };

  // 📏 PAGE SIZE
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  // 🔃 SORT HANDLER
  const handleSort = (path) => {
    setSortColumn((prev) => {
      if (prev.path === path) {
        return { path, order: prev.order === "asc" ? "desc" : "asc" };
      }
      return { path, order: "asc" };
    });
  };

  // 🔼🔽 SORT ICON
  const renderSortIcon = (path) => {
    if (sortColumn.path !== path) return null;
    return sortColumn.order === "asc" ? " ▲" : " ▼";
  };

  const handleNavigation = (title, index) => {
    if (index == 0) {
      naviagate(`/movie/${title}`);
    }
  };

  // 🔍 FILTER
  let filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      selectedGenre === "All" || movie.genre.name === selectedGenre;

    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  // 🔃 SORT
  if (sortColumn.path) {
    filteredMovies.sort((a, b) => {
      const getValue = (obj, path) =>
        path.split(".").reduce((o, p) => o[p], obj);

      const aVal = getValue(a, sortColumn.path);
      const bVal = getValue(b, sortColumn.path);

      if (aVal < bVal) return sortColumn.order === "asc" ? -1 : 1;
      if (aVal > bVal) return sortColumn.order === "asc" ? 1 : -1;
      return 0;
    });
  }

  // 📄 PAGINATION
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="container mt-4">
      <div className="row">
        {/* GENRE LIST */}
        <div className="col-3">
          <ul className="list-group">
            <li
              className={`list-group-item ${
                selectedGenre === "All" ? "active" : ""
              }`}
              onClick={() => handleGenreSelect("All")}
              style={{ cursor: "pointer" }}
            >
              All Genres
            </li>

            {genres.map((g) => (
              <li
                key={g._id}
                className={`list-group-item ${
                  selectedGenre === g.name ? "active" : ""
                }`}
                onClick={() => handleGenreSelect(g.name)}
                style={{ cursor: "pointer" }}
              >
                {g.name}
              </li>
            ))}
          </ul>
        </div>

        {/* MOVIES TABLE */}
        {/* Search Component */}
        <div className="col">
          {/* <input
            className="form-control mb-2"
            placeholder="Search movie..."
            value={searchQuery}
            onChange={handleSearch}
          /> */}
          <Search onSearch={handleSearch} />

          {/* PAGE SIZE */}

          <select
            className="form-select mb-3 w-25"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={3}>3 per page</option>
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
          </select>

          <p>Showing {filteredMovies.length} movies</p>

          <table className="table table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th
                  onClick={() => handleSort("_id")}
                  style={{ cursor: "pointer" }}
                >
                  #{renderSortIcon("_id")}
                </th>

                <th
                  onClick={() => handleSort("title")}
                  style={{ cursor: "pointer" }}
                >
                  Title
                  {renderSortIcon("title")}
                </th>

                <th
                  onClick={() => handleSort("genre.name")}
                  style={{ cursor: "pointer" }}
                >
                  Genre
                  {renderSortIcon("genre.name")}
                </th>

                <th
                  onClick={() => handleSort("numberInStock")}
                  style={{ cursor: "pointer" }}
                >
                  Stock
                  {renderSortIcon("numberInStock")}
                </th>

                <th
                  onClick={() => handleSort("dailyRentalRate")}
                  style={{ cursor: "pointer" }}
                >
                  Rate
                  {renderSortIcon("dailyRentalRate")}
                </th>

                <th>Like</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {paginatedMovies.map((movie, index) => (
                <tr key={movie._id}>
                  <td>{startIndex + index + 1}</td>
                  <td onClick={() => handleNavigation(movie.title, index)}>
                    {" "}
                    {movie.title}
                    {/* <Link to={`/movie/${movie.title}`}>{movie.title}</Link> */}
                  </td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td
                    onClick={() => handleLike(movie._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {movie.liked ? "❤️" : "🤍"}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedMovies.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-danger">
                    No Movies Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;

//================= START OF FILE =================
// import React, { useState } from "react";
// import { getMovies } from "./MoiveService/MoiveService";
// import { genres } from "./MoiveService/MoiveService";
// import Pagination from "./Pagination";

// const Movies = () => {
//   const [movies, setMovies] = useState(getMovies());
//   const [selectedGenre, setSelectedGenre] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(3);

//   //  Like
//   const handleLike = (id) => {
//     setMovies(prev =>
//       prev.map(m =>
//         m._id === id ? { ...m, liked: !m.liked } : m
//       )
//     );
//   };

//   // Delete
//   const handleDelete = (id) => {
//     setMovies(prev => prev.filter(m => m._id !== id));
//   };

//   //  Genre
//   const handleGenreSelect = (genre) => {
//     setSelectedGenre(genre);
//     setSearchQuery("");
//     setCurrentPage(1);
//   };

//   //  Search
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setSelectedGenre("All");
//     setCurrentPage(1);
//   };

//   //  Page size change
//   const handlePageSizeChange = (e) => {
//     setPageSize(Number(e.target.value));
//     setCurrentPage(1); //  reset page
//   };

//   //  FILTER
//   const filteredMovies = movies.filter(movie => {
//     const matchesGenre =
//       selectedGenre === "All" || movie.genre.name === selectedGenre;

//     const matchesSearch =
//       movie.title.toLowerCase().includes(searchQuery.toLowerCase());

//     return matchesGenre && matchesSearch;
//   });

//   // PAGINATION SLICE
//   const startIndex = (currentPage - 1) * pageSize;
//   const paginatedMovies = filteredMovies.slice(
//     startIndex,
//     startIndex + pageSize
//   );

//   return (
//     <div className="container mt-4">
//       <div className="row">

//         {/* GENRES */}
//         <div className="col-3">
//           <ul className="list-group">
//             <li
//               className={`list-group-item ${selectedGenre === "All" ? "active" : ""}`}
//               onClick={() => handleGenreSelect("All")}
//             >
//               All Genres
//             </li>

//             {genres.map(g => (
//               <li
//                 key={g._id}
//                 className={`list-group-item ${selectedGenre === g.name ? "active" : ""}`}
//                 onClick={() => handleGenreSelect(g.name)}
//               >
//                 {g.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* MOVIES */}
//         <div className="col">

//           {/* SEARCH */}
//           <input
//             className="form-control mb-2"
//             placeholder="Search movie..."
//             value={searchQuery}
//             onChange={handleSearch}
//           />

//           {/* PAGE SIZE */}
//           <select
//             className="form-select mb-3 w-25"
//             value={pageSize}
//             onChange={handlePageSizeChange}
//           >
//             <option value={3}>3 per page</option>
//             <option value={5}>5 per page</option>
//             <option value={10}>10 per page</option>
//           </select>

//           <p>
//             Showing {filteredMovies.length} movies
//           </p>

//           <table className="table table-striped text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>#</th>
//                 <th>Title</th>
//                 <th>Genre</th>
//                 <th>Stock</th>
//                 <th>Rate</th>
//                 <th>Like</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedMovies.map((movie, index) => (
//                 <tr key={movie._id}>
//                   <td>{startIndex + index + 1}</td>
//                   <td>{movie.title}</td>
//                   <td>{movie.genre.name}</td>
//                   <td>{movie.numberInStock}</td>
//                   <td>{movie.dailyRentalRate}</td>
//                   <td onClick={() => handleLike(movie._id)} style={{ cursor: "pointer" }}>
//                     {movie.liked ? "❤️" : "🤍"}
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(movie._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {paginatedMovies.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-danger">
//                     No Movies Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* PAGINATION */}
//           <Pagination
//             itemsCount={filteredMovies.length}
//             pageSize={pageSize}
//             currentPage={currentPage}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Movies;

//================= END OF FILE =================
