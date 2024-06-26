import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title:
    "Blog Grids ",
  description: "Blog grids page description",
};

const Blog = () => {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <>
     <section className="dark:bg-transparent dark:text-white">
	<div className="container max-w-5xl px-4 py-12 mx-auto">
		<div className="grid gap-4 mx-4 sm:grid-cols-12 color-black dark:color-white">
			<div className="col-span-12 sm:col-span-3 color-black dark:color-white">
				<div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0  color-black ">
					<h3 className="text-3xl font-semibold">Recent PhotoSeries</h3>
					<span className="text-sm font-bold tracking-wider uppercase dark:text-white">brought to you</span>
				</div>
			</div>
			<div className="relative col-span-12 px-4 space-y-6 sm:col-span-9 color-black">
      <div className="sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-500 before:dark:bg-gray-500 mx-2"> 
        {posts.map((blog, index) => (
              <div key={index} className="border-l-4 border-black dark:border-white w-full px-10 md:w-2/3 lg:w-1/2 xl:w border-black sm:border-none  ">
               <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-black dark:before:bg-white">
                  <h3 className="text-xl font-semibold tracking-wide">{blog.title}</h3>
                  <time className="text-xs my-3 tracking-wide uppercase dark:text-white">{blog.date.toLocaleDateString()}</time>
                  <p className="mt-3">{blog.excerpt}</p>
                  <Link className="my-10 bg-violet-500 text-white inline-block py-1 px-2 rounded-full text-sm lg:rounded-md flex justify-center items-center" href={`/blogs/${blog.slug}`}>
                      Read more
                    </Link>
                  
                </div>
              </div>
            ))}
				</div>
			</div>
		</div>
	</div>
</section>
    </>
  );
};

export default Blog;
/*
      <Breadcrumb pageName="Blog Grids" />

      <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {posts.map((blog, i) => (
              <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
    */