import { AnimatedText } from "@/components/ui/animated-text";
import AnimationWrapper from "@/components/ui/animation-wrapper";

import { Separator } from "@/components/ui/separator";
import MenuElements from "@/lib/menu-elements";

import { Metadata } from "next";
import Carousel from "@/components/ui/carousel";
import ThemeToggle from "@/components/ui/my-theme-toggle";
interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}
const images: ImageProps[] = [
  { src: "/images/image1.png",
    alt: 'Image 1',
    width: 800,
    height: 600,
  },
  {
    src: '/images/image2.png',
    alt: 'Image 2',
    width: 800,
    height: 600,
  },
  {
    src: '/images/image3.png',
    alt: 'Image 3',
    width: 800,
    height: 600,
  },
  {
    src: '/images/image4.png',
    alt: 'Image 4',
    width: 800,
    height: 600,
  },
  {
    src: '/images/image5.png',
    alt: 'Image 5',
    width: 800,
    height: 600,
  },
];

export const metadata: Metadata = {
  title: "Home",
  description:
    "The world as it is experienced by a particular organism.",
};

export default function Home() {
  return (
    <>
    <AnimationWrapper>
      <div className="flex relative isolate items-center my-8 justify-center align-middle px-5">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight  sm:text-6xl my-10">
            <AnimatedText
              text="Arghyadeep"
              once
              className="text-5xl font-bold tracking-tight  sm:text-6xl"
            />
          </h1>
          <p className="mt-6 text-sm  md:text-md leading-6 md:leading-8 text-muted-foreground">
            /ˈআলোকচিত্র / छविचित्रण / عکاسی
          </p>
          <blockquote>
            <p className="mt-6 text-md md:text-xl font-bold md:font-normal  underline-offset-4	 leading-8">
            The world through my lenses
            </p>
          </blockquote>
          <p className="my-6 mb-12 text-sm md:leading-8 text-muted-foreground">
            &quot;
            हर एक नज़र में बसी एक अनमोल याद है।
           &quot;
          </p>
          <ThemeToggle/>
          <div className="pt-12 text-xs md:text-normal mb-5 lg:hidden opacity-60 ">
            
            {/* <p className="m-6 ">Dive in:</p> */}
            <MenuElements className="md:p-5" />
          </div>
          {/* <div className="lg:hidden opacity-60">
            <ModeToggle />
          </div> */}
          {/* <ModeToggle className="test lg:hidden opacity-60" /> */}
        </div>
      </div>
    </AnimationWrapper>
    <AnimationWrapper>
    <div className="overflow-x-hidden overflow-y-hidden w-full">
    <Carousel />
    </div>
    </AnimationWrapper>
</>
  );
}