import Image from 'next/image';

const BlogCard = ({ title, description, imgSrc }) => (
  <div className="p-4 max-w-sm bg-white dark:bg-gray-800 shadow-md rounded-lg">
    <Image src={imgSrc} alt={title} width={400} height={300} className="rounded-t-lg" />
    <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
    <p className="mt-1 text-gray-700 dark:text-gray-300">{description}</p>
  </div>
);

export default BlogCard;
