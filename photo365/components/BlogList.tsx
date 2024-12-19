import React from 'react';

interface Blog {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  link: string;
}

interface BlogLayoutThreeProps {
  blog: Blog;
}

const BlogLayoutThree: React.FC<BlogLayoutThreeProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <a href={blog.link} className="block relative">
        <div
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${blog.imageUrl})` }}
        ></div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
          <p className="text-gray-700">{blog.category}</p>
        </div>
      </a>
    </div>
  );
};

export default BlogLayoutThree;
