import Marquee from "@/components/ui/marquee";
import React from "react";
import PropertyCard from "./property-card";
import { propertydata } from "@/datas";

const HotProperty = () => {
  return (
    <section className="py-10 md:py-20 px-10 md:px-20">
      <h1 className="text-[#333333] font-[800] text-3xl md:text-5xl mb-10">
        Hot Properties
      </h1>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {propertydata.map((data) => (
            <PropertyCard {...data} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default HotProperty;
