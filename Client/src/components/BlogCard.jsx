import React from "react";

function BlogCard({ image, title, description, onReadMore }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="text-xl font-semibold text-[#2B6A7C]">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <button
          onClick={onReadMore}
          className="mt-4 text-[#2B6A7C] hover:text-[#A7DFEC] self-end"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
