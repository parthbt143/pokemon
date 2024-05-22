import React from "react";

const SkeletonLoader: React.FC<{ viewType: string }> = ({ viewType }) => (
  <>
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className={`flex items-center bg-gray-200 p-4 shadow rounded animate-pulse ${
          viewType === "list" ? "mb-4" : ""
        }`}
      >
        <div
          className="rounded-full bg-gray-400"
          style={{
            width: viewType === "list" ? "50px" : "100px",
            height: viewType === "list" ? "50px" : "100px",
          }}
        ></div>
        <div
          className={`${
            viewType === "list" ? "ml-4" : "text-center mt-2"
          } w-full h-6 bg-gray-400 rounded`}
        ></div>
      </div>
    ))}
  </>
);

export default SkeletonLoader;
