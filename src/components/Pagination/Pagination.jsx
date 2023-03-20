import React, { useState } from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        paginate(pageNumber);
    };
    const pageRange = (min, max) => [...Array(max - min + 1)].map((_, i) => min + i);
    const renderPageNumbers = () => (
        <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
            </li>
            {totalPages > 9 && currentPage > 5 && (
                <>
                    <li className="page-item">
                        <button className="page-link" onClick={() => handleClick(1)}>
                            1
                        </button>
                    </li>
                    <li className="page-item disabled">
                        <button className="page-link">...</button>
                    </li>
                </>
            )}
            {pageRange(Math.max(currentPage - 3, 1), Math.min(currentPage + 3, totalPages)).map((number) => (
                <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handleClick(number)}>
                        {number}
                    </button>
                </li>
            ))}
            {totalPages > 9 && currentPage < totalPages - 4 && (
                <>
                    <li className="page-item disabled">
                        <button className="page-link">...</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => handleClick(totalPages)}>
                            {totalPages}
                        </button>
                    </li>
                </>
            )}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </li>
        </ul>
    );

    return renderPageNumbers();
};

export default Pagination;
