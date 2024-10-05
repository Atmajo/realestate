import React from "react";
import Socials from "../social";
import { quicklinksdata, searchplacedata } from "@/datas";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-between w-full bg-[#333333] text-white">
      <div className="flex flex-row justify-between items-center border-b px-20 py-20 w-full">
        <div>
          <h1 className="font-semibold text-3xl">Real Estate</h1>
          <p className="text-lg">Gateway to your dream homes</p>
          <Socials />
        </div>
        <div className="flex flex-row justify-between items-center gap-20">
          <div className="flex flex-col justify-end items-end">
            <h1 className="font-semibold text-3xl">Quick Links</h1>
            {quicklinksdata.map(({ id, name, url }) => (
              <Link href={url} key={id} className="text-lg">
                {name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-end items-end">
            <h1 className="font-semibold text-3xl">Search Places</h1>
            {searchplacedata.map(({ id, name, url }) => (
              <Link href={url} key={id} className="text-lg">
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-3">
        <p className="font-light text-lg">
          copyright © 2024. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
