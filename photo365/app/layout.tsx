"use client"
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode, FC } from "react";
import Menu from "@/components/ui/menu";
import { Particles } from "@/components/particles";
import { Providers } from "@/lib/providers";
import GoogleAnalytics from "./GoogleAnalytics";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children, modal }) => {
  const pathname = usePathname();

  // Check if the current route is the admin page
  const isAdminPage = pathname.includes("/admin");

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            {/* Conditionally render the menu based on the route */}
            {!isAdminPage && <Menu />}
            <Particles className="absolute inset-0 -z-10" />
            {children}
            <h2 className="text-center bottom-3 text-xs md:text-normal left-0 opacity-60 right-0 m-auto w-5/6 md:w-1/2  scroll-m-20 p-5 pt-10 text-md  tracking-tight transition-colors first:mt-0">
              by Chandril @ grwm365
            </h2>
          </Providers>
          <GoogleAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
