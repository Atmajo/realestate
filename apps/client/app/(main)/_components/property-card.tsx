import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const PropertyCard = ({ name, company, price, link, image }: PropertyProps) => {
  return (
    <figure
      className={cn(
        "relative flex flex-col w-96 h-[400px] justify-between cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <img src={image} alt="" className="w-full h-72 rounded-xl" />
      <div className="flex flex-row items-center w-full gap-2 mt-5">
        <div className="flex flex-col w-full">
          <figcaption className="text-xl font-semibold dark:text-white">
            {name}
          </figcaption>
          <div className="flex justify-between items-center">
            <p className="text-xs font-semibold dark:text-white/40">
              {company}
            </p>
            <blockquote className="text-sm">
              {price!.split("-")[0]+"akhs onwards"}
            </blockquote>
          </div>
        </div>
      </div>
      <Link href={link!} className="w-full mt-2">
        <Button className="rounded-xl w-full">View Details</Button>
      </Link>
    </figure>
  );
};

export default PropertyCard;
