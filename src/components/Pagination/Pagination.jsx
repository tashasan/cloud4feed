import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        let firstPage, lastPage;
        const numPages = pageNumbers.length;

        if (numPages <= 9) {
            firstPage = 1;
            lastPage = numPages;
        } else if (currentPage <= 5) {
            firstPage = 1;
            lastPage = 7;
        } else if (currentPage >= numPages - 4) {
            firstPage = numPages - 6;
            lastPage = numPages;
        } else {
            firstPage = currentPage - 3;
            lastPage = currentPage + 3;
        }

        const pageRange = [...Array(lastPage - firstPage + 1).keys()].map((i) => firstPage + i);

        return (
            <ul className='pagination'>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>
                {firstPage !== 1 && (
                    <>
                        <li className='page-item'>
                            <button className='page-link' onClick={() => { setCurrentPage(1); handlePageClick(1) }}>
                                1
                            </button>
                        </li>
                        {firstPage > 2 && (
                            <li className='page-item disabled'>
                                <button className='page-link'>...</button>
                            </li>
                        )}
                    </>
                )}
                {pageRange.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button className='page-link' onClick={() => handlePageClick(number)}>
                            {number}
                        </button>
                    </li>
                ))}
                {lastPage !== numPages && (
                    <>
                        {lastPage < numPages - 1 && (
                            <li className='page-item disabled'>
                                <button className='page-link'>...</button>
                            </li>
                        )}
                        <li className='page-item'>
                            <button className='page-link' onClick={() => { setCurrentPage(numPages); handlePageClick(numPages) }}>
                                {numPages}
                            </button>
                        </li>
                    </>
                )}
                <li className={`page-item ${currentPage === numPages ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={nextPage} disabled={currentPage === numPages}>
                        Next
                    </button>
                </li>
            </ul>
        );
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        console.log(pageNumber)
        paginate(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
            paginate(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            paginate(currentPage - 1);
        }
    };

    return renderPageNumbers();
};

export default Pagination;
