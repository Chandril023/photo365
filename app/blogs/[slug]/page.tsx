import Newsletter from "@/components/Blog/Newsletter";
import PopularArticle from "@/components/Blog/PopularArticle";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getAllPosts, getPostBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const post = getPostBySlug(params.slug, [
    "title",
    "author",
    "content",
    "metadata",
  ]);

  const siteName = process.env.SITE_NAME || "Your Site Name";
  const authorName = process.env.AUTHOR_NAME || "Your Author Name";

  if (post) {
    const metadata = {
      title: `${post.title || "Single Post Page"} | ${siteName}`,
      author: authorName,
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };

    return metadata;
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
      author: authorName,
      robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
          index: false,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default async function Post({ params }: Props) {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const post = getPostBySlug(params.slug, [
    "title",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
  ]);

  const content = await markdownToHtml(post.content || "");

  return (
    <>
    
      <div className="max-w-2xl px-6 py-16 mx-auto space-y-12 dark:text-white">
	<article className="space-y-8 text-black dark:transparent dark:text-white">
		<div className="space-y-6">
			<h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{post.title}</h1>
			<div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-white">
				<div className="flex items-center md:space-x-2">
					<img src="https://source.unsplash.com/75x75/?portrait" alt="" className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-300" />
					<p className="text-sm">{post.author}• July 19th, 2021</p>
				</div>
				<p className="flex-shrink-0 mt-3 text-sm md:mt-0">4 min read • 1,570 views</p>
			</div>
		</div>
		<div className="dark:text-white">
    <div dangerouslySetInnerHTML={{ __html: content }}></div>
		</div>
	</article>
	<div>
		<div className="flex flex-wrap py-6 gap-2 border-t border-dashed dark:border-gray-600">
			<a rel="noopener noreferrer" href="/" className="px-3 py-1 rounded-sm hover:underline bg-violet-600 text-white">Home?</a>
			<a rel="noopener noreferrer" href="/gallery" className="px-3 py-1 rounded-sm hover:underline bg-violet-600 text-white ">Gallery</a>
			<a rel="noopener noreferrer" href="/contact" className="px-3 py-1 rounded-sm hover:underline bg-violet-600 text-white">Contact</a>
		</div>
		<div className="space-y-2">
			<h4 className="text-lg font-semibold">Related posts</h4>
			<ul className="ml-4 space-y-1 list-disc">
				<li>
					<a rel="noopener noreferrer" href="#" className="hover:underline">Nunc id magna mollis</a>
				</li>
				<li>
					<a rel="noopener noreferrer" href="#" className="hover:underline">Duis molestie, neque eget pretium lobortis</a>
				</li>
				<li>
					<a rel="noopener noreferrer" href="#" className="hover:underline">Mauris nec urna volutpat, aliquam lectus sit amet</a>
				</li>
			</ul>
		</div>
	</div>
</div>
    </>
  );
}
