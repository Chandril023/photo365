import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Link from "next/link";
function RedirectOnSignIn(): null {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter(); // Next.js uses useRouter instead of useNavigate

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Redirect to the admin page
      router.push("/admin");
    }
  }, [isLoaded, isSignedIn, router]);

  return null;
}

type Props = {
  className?: string;
  mobileMenuOpen?: Boolean;
  setMobileMenuOpen?: any;
};

export default function MenuElements({
  className,
  mobileMenuOpen,
  setMobileMenuOpen,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <ul className={`${className} flex justify-center`}>
      {navigation.map((item) => (
        <li key={item.name}>
          {item.name === "Home" ? (
            // Using a regular anchor tag for the "Home" link to trigger a full reload
            <a
              onClick={() => (mobileMenuOpen ? setMobileMenuOpen(false) : "")}
              href={item.href}
              className={`${className} ${
                pathname === item.href ? "font-bold" : "no underline"
              } underline leading-8 px-2 md:px-4 py-2 items-center underline-offset-8 break-normal inline-block hover:underline break-keep`}
            >
              {item.name}
            </a>
          ) : (
            // For other links, continue using Next.js Link
            <Link
              onClick={() => (mobileMenuOpen ? setMobileMenuOpen(false) : "")}
              href={item.href}
              className={`${className} ${
                pathname === item.href ? "font-bold" : "no underline"
              } underline leading-8 px-2 md:px-4 py-2 items-center underline-offset-8 break-normal inline-block hover:underline break-keep`}
            >
              {pathname === item.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-0 top-full block z-90 h-[1px] w-full bg-black dark:bg-white"
                ></motion.span>
              )}
              {item.name}
            </Link>
          )}
        </li>
      ))}
      <div className={`${className} flex justify-center`}>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <RedirectOnSignIn />
        </SignedIn>
      </div>
    </ul>
  );
}
