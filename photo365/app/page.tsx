'use client'
import { AnimatedText } from "@/components/ui/animated-text";
import AnimationWrapper from "@/components/ui/animation-wrapper";
import { Separator } from "@/components/ui/separator";
import MenuElements from "@/lib/menu-elements";
import ThemeToggle from "@/components/ui/my-theme-toggle";

import Carousal from "@/components/ui/carousal"; // Ensure the import path is correct

import About from "./about/page";
import Page from "./contact/page";
import { ClerkProvider } from "@clerk/nextjs";
import MasonryGallery from "@/components/ui/imageGallery";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}


export default function Home() {
 

  return (
    <>
      <AnimationWrapper>
        <div className="flex relative isolate items-center my-8 justify-center align-middle px-5" id="home">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl my-10">
              <AnimatedText
                text="Arghyadeep"
                once
                className="text-5xl font-bold tracking-tight sm:text-6xl"
              />
            </h1>
            <p className="mt-6 text-sm md:text-md leading-6 md:leading-8 text-muted-foreground">
              /ˈআলোকচিত্র / छविचित्रण / عکاسی
            </p>
            <blockquote>
              <p className="mt-6 text-md md:text-xl font-bold md:font-normal underline-offset-4 leading-8">
                The world through my lenses
              </p>
            </blockquote>
            <p className="my-6 mb-12 text-sm md:leading-8 text-muted-foreground">
              &quot; हर एक नज़र में बसी एक अनमोल याद है। &quot;
            </p>
            <ThemeToggle />
            <div className="pt-12 text-xs md:text-normal mb-5 lg:hidden opacity-60">
              <MenuElements className="md:p-5" />
            </div>
          </div>
        </div>
        <div className="overflow-x-hidden overflow-y-hidden w-full mb-8" id="gallery">
  <MasonryGallery />
</div>

<div className="overflow-x-hidden overflow-y-hidden w-full mb-8" id="about">
  <About />
</div>

<div className="overflow-x-hidden overflow-y-hidden w-full" id="contact">
  <Page />
</div>

      </AnimationWrapper>
     
    </>
  );
}