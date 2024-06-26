import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-6">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 mx-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
    >
      Previous
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => onPageChange(i + 1)}
        className={`px-4 py-2 mx-1 ${
          currentPage === i + 1
            ? 'bg-blue-500 dark:bg-blue-700 text-white'
            : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
        } rounded`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 mx-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
    >
      Next
    </button>
  </div>
);

export default Pagination;
