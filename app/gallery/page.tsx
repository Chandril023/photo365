import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header-on-page";
import { getPhotoSeries } from "@/utils/contentful-fetches";
import Image from "next/image";
import { Separator } from "@components/ui/separator";
import Link from "next/link";
import { ImageSeriesProps } from "@/utils/types";
import AnimationWrapper from "@/components/ui/animation-wrapper";
import { Metadata } from "next";
import './page.css'
type Props = {};

export const metadata: Metadata = {
  title: "Photo Series",
  description: "Photographs in meaningful grouping.",
};

const Page = async () => {
  const images = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png",
    "/images/image4.png",
    "/images/image5.png",
    // Add more image paths as needed
  ];

  return (
    <AnimationWrapper>
      <nav className="border-b px-4 py-2 bg-white dark:bg-transparent">
        <div className="flex flex-wrap items-center justify-between md:justify-around">
        <img
        className="h-10 block dark:hidden"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        alt="instagram"
/>
<img
  className="h-10 hidden dark:block my-3"
  src="https://umamiharstad.no/wp-content/uploads/2018/09/instagram-font-logo-white-png.png"
  alt="instagram"
/>
        </div>
      </nav>

      <main className="bg-gray-100 dark:bg-transparent bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1" src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" alt="profile" />
            </div>
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0 dark:text-white">
                  mrtravlerrr_
                </h2>
                <span className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                  <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
                </span>
                <a href="#" className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block block">Follow</a>
              </div>
              <ul className="hidden md:flex space-x-8 mb-4 dark:text-gray-400">
                <li>
                  <span className="font-semibold">136</span> posts
                </li>
                <li>
                  <span className="font-semibold">40.5k</span> followers
                </li>
                <li>
                  <span className="font-semibold">302</span> following
                </li>
              </ul>
              <div className="hidden md:block dark:text-gray-400">
                <h1 className="font-semibold">Mr Travlerrr...</h1>
                <span>Travel, Nature and Music</span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>
            <div className="md:hidden text-sm my-2 dark:text-gray-400">
              <h1 className="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>
          <div className="px-px md:px-3">
            <ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 dark:text-gray-400 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 dark:text-white block">136</span>
                posts
              </li>
              <li>
                <span className="font-semibold text-gray-800 dark:text-white block">40.5k</span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 dark:text-white block">302</span>
                following
              </li>
            </ul>
            <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 dark:text-gray-400 border-t dark:border-gray-500">
              <li className="md:border-t md:border-black md:-mt-px md:text-black dark:md:border-white dark:md:text-white">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline">post</span>
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap -mx-px md:-mx-3">
              {images.map((image, index) => (
                <div className="w-1/3 p-px md:px-3" key={index}>
                  <a href="#">
                    <article className="post bg-gray-100 dark:bg-gray-800 text-white relative pb-full md:mb-6">
                      <img className="w-full h-full absolute left-0 top-0 object-cover" src={image} alt={`image${index + 1}`} />
                      <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                      <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                        <div className="flex justify-center items-center space-x-4 h-full">
                          <span className="p-2">
                            <i className="fas fa-heart"></i>
                            412K
                          </span>
                          <span className="p-2">
                            <i className="fas fa-comment"></i>
                            2,909
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </AnimationWrapper>
  );
};

export default Page;
