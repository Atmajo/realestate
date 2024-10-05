import BgLayer from "@/app/(main)/_components/bglayer";
import ScreenWrapper from "@/components/wrapper/screen-wrapper";
import { propertydata } from "@/datas";
import React from "react";

const Page = ({ params }: PropertyProps) => {
  console.log(params);
  return (
    <section>
      {propertydata.map(
        (data) =>
          params.id === data.id && (
            <div key={data.id}>
              <ScreenWrapper key={data.id}>
                <div className="flex flex-col justify-end items-end h-full py-10">
                  <div className="flex flex-col justify-end items-end mt-20 md:mt-5 z-10">
                    <h1 className="font-semibold text-5xl text-white text-center">
                      {data.name}
                    </h1>
                    <p className="text-white text-2xl mt-5">{data.place}</p>
                  </div>
                </div>
                <div className="home-bg"></div>
              </ScreenWrapper>
              <div className="px-10 py-14 text-[#333333]">
                <h1 className="text-6xl font-semibold">{data.name}</h1>
                <p className="text-2xl">{data.place}</p>

                <p className="text-xl mt-5">{data.desc}</p>
              </div>
            </div>
          )
      )}
      <BgLayer />
    </section>
  );
};

export default Page;
