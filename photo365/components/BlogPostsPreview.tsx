import { FunctionComponent } from "react";

// Define the interface for BlogPost
interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  tags: { id: string; name: string }[];
}

// FunctionComponent type with prop 'post' of type BlogPost
const BlogPostPreview: FunctionComponent<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={post.image} alt={post.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">{post.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {post.date}
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogPostPreview;
