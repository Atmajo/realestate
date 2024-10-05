import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navdata } from "@/datas";
import Link from "next/link";
import React from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full px-5 md:px-19 lg:px-32 z-10">
      <div className="flex justify-between items-center border-b border-white w-full py-5 ">
        <Link href="/">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Real Estate
          </h1>
        </Link>

        <div
          className="justify-center items-center gap-5 hidden md:flex"
          key={"ghgasdasg"}
        >
          {navdata.map((item) => (
            <Link key={item.id} href={item.url} className="text-white text-lg">
              {item.name}
            </Link>
          ))}
          <Button variant={"secondary"} size={"lg"}>
            Book Now
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="bg-emerald-500 rounded-full p-2">
              <Menu size={32} className="text-white" />
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between bg-emerald-300">
              <div
                className="flex flex-col gap-5 text-black mt-5"
                key={"dasdasdasdasd"}
              >
                {navdata.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <Link href={item.url} className="text-black text-lg">
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <Button variant={"secondary"} size={"lg"}>
                Book Now
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
