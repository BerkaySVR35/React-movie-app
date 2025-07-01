import React from "react";

export default function Pagination({
  nextPage,
  previousPage,
  currentPage,
  totalPages,
}) {
  return (
    <nav>
      <ul className="pagination d-flex justify-content-between">
        <li className={currentPage != 1 ? "page-item" : "page-item disabled"}>
          <a
            className="page-link"
            href=""
            onClick={(e) => e.preventDefault(previousPage())}
          >
            Geri
          </a>
        </li>
        <li
          className={
            currentPage < totalPages ? "page-item" : "page-item disabled"
          }
        >
          <a
            className="page-link"
            href=""
            onClick={(e) => e.preventDefault(nextPage())}
          >
            İleri
          </a>
        </li>
      </ul>
    </nav>
  );
}
