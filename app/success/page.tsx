import React from "react";
import Link from "next/link";

const SuccessPage = ({ message = "Success!" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-8">{message}</h1>
      <Link href="/">
        
          Go Back Home
       
      </Link>
    </div>
  );
};

export default SuccessPage;
