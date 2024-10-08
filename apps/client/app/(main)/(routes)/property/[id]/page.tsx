"use client";

import BgLayer from "@/app/(main)/_components/bglayer";
import { Button } from "@/components/ui/button";
import ScreenWrapper from "@/components/wrapper/screen-wrapper";
import { propertydata } from "@/datas";
import Image from "next/image";
import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/styles/property.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Share2 } from "lucide-react";

const Page = ({ params }: PropertyPageProps) => {
  return (
    <section>
      {propertydata.map(
        (data) =>
          data.id === params.id && (
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
                    <p className="text-white text-xl md:text-2xl mt-2 md:mt-5">
                      {data.place}
                    </p>
                  </div>
                </div>
              </ScreenWrapper>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper relative"
              >
                <SwiperSlide className="image-container">
                  <Image
                    src={"/images/h2.png"}
                    alt={data.insideImg}
                    layout="fill"
                    objectFit="cover"
                  />
                </SwiperSlide>
              </Swiper>
              <div className="px-5 md:px-10 py-14 text-[#333333]">
                <h1 className="text-6xl font-semibold">{data.name}</h1>
                <p className="text-2xl">{data.place}</p>

                <p className="text-xl mt-5">{data.desc}</p>

                <div className="mt-20">
                  <h1 className="font-semibold text-5xl italic">
                    Specifications
                  </h1>
                  <div className="flex mt-10">
                    <div className="flex flex-col pr-2 border-r-2 border-black">
                      <h1 className="font-semibold text-xl md:text-3xl text-[#757575]">
                        Plot Size
                      </h1>
                      <p className="font-semibold text-lg md:text-xl">
                        {data.specifications.plotSize}
                      </p>
                    </div>
                    <div className="flex flex-col px-2 border-r-2 border-black">
                      <h1 className="font-semibold text-xl md:text-3xl text-[#757575]">
                        Built Area
                      </h1>
                      <p className="font-semibold text-lg md:text-xl">
                        {data.specifications.builtUpArea}
                      </p>
                    </div>
                    <div className="flex flex-col pl-2">
                      <h1 className="font-semibold text-xl md:text-3xl text-[#757575]">
                        Bedooms
                      </h1>
                      <p className="font-semibold text-lg md:text-xl">
                        {data.specifications.bedrooms}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-20">
                  <h1 className="font-semibold text-5xl italic">Features</h1>
                  <div className="flex md:flex-row flex-col md:items-center gap-y-5 md:gap-x-5 lg:gap-x-20 mt-10">
                    <div className="flex flex-col justify-start items-start gap-5">
                      {data.features
                        .slice(0, data.features.length / 2)
                        .map((feature) => (
                          <div
                            key={feature.id}
                            className="flex justify-center items-center gap-5"
                          >
                            <Image
                              src={feature.icon}
                              alt={feature.name}
                              width={60}
                              height={60}
                            />
                            <p className="font-semibold text-lg italic">
                              {feature.name}
                            </p>
                          </div>
                        ))}
                    </div>
                    <div className="flex flex-col justify-start items-start gap-5">
                      {data.features
                        .slice(data.features.length / 2)
                        .map((feature) => (
                          <div
                            key={feature.id}
                            className="flex justify-center items-center gap-5"
                          >
                            <Image
                              src={feature.icon}
                              alt={feature.name}
                              width={60}
                              height={60}
                            />
                            <p className="font-semibold text-lg italic">
                              {feature.name}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-20">
                  <h1 className="font-semibold text-5xl italic">Location</h1>
                  <p className="font-light italic text-lg">
                    {data.location.desc}
                  </p>
                  <div className="flex flex-col md:flex-row gap-20 mt-10">
                    <div className="flex flex-col gap-2 justify-between">
                      {data.location.data.map((location) => (
                        <div className="flex flex-col" key={location.id}>
                          <h1 className="font-semibold text-3xl italic">
                            {location.name}
                          </h1>
                          <p className="font-light text-xl">{location.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-1">
                      <iframe
                        src={data.location.url}
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <Button
                    variant={"secondary"}
                    className="mt-20 rounded-xl"
                    size={"lg"}
                  >
                    Enquire
                  </Button>
                </div>
              </div>
            </div>
          )
      )}
      <BgLayer />
    </section>
  );
};

export default Page;
