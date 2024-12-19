import React from "react";
import Link from "next/link";
function SuccessPage(){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-8">Thank You ! We have received your message</h1>
      <Link href="/">
        <a className="text-blue-500 hover:underline">Go Back Home</a>
      </Link>
    </div>
  );
};

export default SuccessPage;
