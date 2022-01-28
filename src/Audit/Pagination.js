import React from "react";

const Pagination = ({ postsPerPage, totalPosts }) => {
  const pageNumbers = [];
  console.log("cbxcbcjsjcdjdj", totalPosts);
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {pageNumbers.map((page) => (
          <li key={page} className="page-item">
            <a href="!#" classname="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
