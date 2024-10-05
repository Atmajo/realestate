"use client";
import { avatardata } from "@/datas";
import Image from "next/image";
import React from "react";

const AvatarReview = () => {
  return (
    <div className="flex flex-col justify-start items-start z-10">
      <div className="flex ">
        {avatardata.map(({ id, url }) => (
          <Image
            src={url}
            alt={url}
            width={70}
            height={70}
            key={id}
            className="border border-white rounded-full w-12 -ml-2"
          />
        ))}
      </div>
      <div className="mt-5">
        <h1 className="text-white font-semibold text-lg  md:text-xl">10K+</h1>
        <p className=" text-lg md:text-xl text-white font-light">
          Satisfied Customers
        </p>
      </div>
    </div>
  );
};

export default AvatarReview;
