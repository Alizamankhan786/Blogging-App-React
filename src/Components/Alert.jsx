import React from 'react'

const Alert = () => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-4">
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <span>Your Blog Has Been Uploaded SuccessFully!</span>
    </div>
  );
};

export default Alert