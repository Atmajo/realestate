import BgLayer from "@/app/(main)/_components/bglayer";
import { Button } from "@/components/ui/button";
import ScreenWrapper from "@/components/wrapper/screen-wrapper";
import { propertydata } from "@/datas";
import { Share2 } from "lucide-react";
import React from "react";

const Page = ({ params }: PropertyProps) => {
  console.log(params);
  return (
    <section>
      {propertydata.map((data) => (
        <div key={data.id}>
          <ScreenWrapper key={data.id}>
            <div className="flex flex-col justify-end items-end h-full py-10">
              <div className="flex justify-center items-center gap-5">
                <Button
                  variant={"secondary"}
                  className="font-semibold rounded-xl"
                >
                  View Images
                </Button>
                <Share2 className="text-white" size={32} />
              </div>
              <div className="flex flex-col justify-end items-end mt-5 md:mt-10 z-10">
                <h1 className="font-semibold text-3xl md:text-5xl text-white text-center">
                  {data.name}
                </h1>
                <p className="text-white text-xl md:text-2xl mt-2 md:mt-5">{data.place}</p>
              </div>
            </div>
            <div className="home-bg"></div>
          </ScreenWrapper>
          <div className="px-10 py-14 text-[#333333]">
            <h1 className="text-6xl font-semibold">{data.name}</h1>
            <p className="text-2xl">{data.place}</p>

            <p className="text-xl mt-5">{data.desc}</p>

            <div className="mt-20">
              <h1 className="font-semibold text-5xl italic">Specifications</h1>
              <div className="flex mt-10">
                <div className="flex flex-col pr-5 border-r-2 border-black">
                  <h1 className="font-semibold text-3xl text-[#757575]">
                    Plot Size
                  </h1>
                  <p className="font-semibold text-xl">
                    {data.specifications.plotSize}
                  </p>
                </div>
                <div className="flex flex-col px-5 border-r-2 border-black">
                  <h1 className="font-semibold text-3xl text-[#757575]">
                    Built Area
                  </h1>
                  <p className="font-semibold text-xl">
                    {data.specifications.builtUpArea}
                  </p>
                </div>
                <div className="flex flex-col pl-5">
                  <h1 className="font-semibold text-3xl text-[#757575]">
                    Bedooms
                  </h1>
                  <p className="font-semibold text-xl">
                    {data.specifications.bedrooms}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h1 className="font-semibold text-5xl italic">Features</h1>
              <div className="flex mt-10"></div>
            </div>
          </div>
        </div>
      ))}
      <BgLayer />
    </section>
  );
};

export default Page;
