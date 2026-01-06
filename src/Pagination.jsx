
import 'bootstrap/dist/css/bootstrap.min.css';
//import React from "react";


const Pagination = ({
    
  itemsCount,
  pageSize,
  currentPage,
  onPageChange
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">

        {/* PREVIOUS */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {/* PAGE NUMBERS */}
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* NEXT */}
        <li className={`page-item ${currentPage === pagesCount ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Pagination;



// const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
//   const pagesCount = Math.ceil(itemsCount / pageSize);
//   if (pagesCount === 1) return null;

//   const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

//   return (
//     <nav>
//       <ul className="pagination justify-content-center">
//         {pages.map(page => (
//           <li
//             key={page}
//             className={`page-item ${page === currentPage ? "active" : ""}`}
//           >
//             <button
//               className="page-link"
//               onClick={() => onPageChange(page)}
//             >
//               {page}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;
