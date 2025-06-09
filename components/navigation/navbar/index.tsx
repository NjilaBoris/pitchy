import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";

import MobileNavigation from "./MoblieNavigation";
import UserAvatar from "@/components/UserAvartar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav
      className="flex-between  background-light900_dark200 fixed z-50 p-6 
    shadow-light-300 dark:shadow-none w-full sm:px-12 gap-5"
    >
      <Link href="/" className="flex gap-1 items-center">
        <Image src="/logo.png" alt="ycdirectory logo" width={30} height={23} />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Yc<span className="text-primary">directory</span>
        </p>
      </Link>
      <div className="hidden sm:flex justify-end flex-row flex-1 items-center ">
        <div className="flex flex-between justify-end gap-6">
          {session?.user?.id ? (
            <>
              <Link href={ROUTES.CREATE_PITCH}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg p-6 shadow-none">
                  <span className="text-primary">Create</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={ROUTES.SIGN_IN}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg p-6 shadow-none">
                  <span className="text-primary">Log In</span>
                </Button>
              </Link>
              <Link href={ROUTES.SIGN_UP}>
                <Button
                  className="small-medium light-border-2 bg-primary-600 text-light-900
              min-h-[41px] w-full rounded-lg border p-6 shadow-none"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div>
        {session?.user?.id && (
          <UserAvatar
            id={session.user.id}
            name={session.user.name!}
            imageUrl={session.user?.image}
          />
        )}

        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
