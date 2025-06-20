import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";
import NavLinks from "./Navlinks";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none p-5"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" width={23} height={23} alt="Logo" />

          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Yc<span className="text-primary">directory</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-full flex-col justify-between overflow-y-auto py-6">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-2 pt-2">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3 mt-5 pt-5">
            {userId ? (
              <>
                <SheetClose asChild>
                  <form
                    action={async () => {
                      "use server";

                      await signOut();
                    }}
                  >
                    <Button
                      type="submit"
                      className="base-medium min-h-[41px] w-full !bg-transparent p-6"
                    >
                      <LogOut className="size-5 text-black dark:text-white" />
                      <span className="text-dark300_light900">Logout</span>
                    </Button>
                  </form>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN}>
                    <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg p-6 shadow-none">
                      <span className="text-primary">Create</span>
                    </Button>
                  </Link>
                </SheetClose>
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN}>
                    <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg p-6 shadow-none">
                      <span className="text-primary">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP}>
                    <Button
                      className="small-medium light-border-2 bg-primary-600 text-light-900
                  min-h-[41px] w-full rounded-lg border p-6 shadow-none"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
