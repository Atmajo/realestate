import { socialdata } from "@/datas";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Socials = () => {
  return (
    <div className="flex gap-5 mt-5">
      {socialdata.map(({ id, name, icon, url }) => (
        <Link href={url} target="_blank" key={id}>
          <Image
            src={icon}
            alt={name}
            width={32}
            height={32}
            className="w-7 h-7"
          />
        </Link>
      ))}
    </div>
  );
};

export default Socials;
