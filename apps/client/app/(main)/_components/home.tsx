"use client";

import React from "react";
import AvatarReview from "./avatar-review";
import BgLayer from "./bglayer";
import { homeimageslider } from "@/datas";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/styles/home.css";
import ScreenWrapper from "@/components/wrapper/screen-wrapper";
import Separator from "./separator";

const Home = () => {
  return (
    <section className="h-screen overflow-hidden">
      <ScreenWrapper>
        <div className="flex justify-end items-end mt-32 z-20">
          <AvatarReview />
        </div>
        <div className="flex flex-col justify-center items-center mt-5 z-20">
          <h1 className="font-[900] text-5xl md:text-7xl max-w-3xl text-white text-center">
            GATEWAY TO YOUR DREAM HOMES
          </h1>
          <p className="text-lg md:text-xl text-white text-center max-w-4xl mt-5 md:mt-10">
            Track the real-time status of your property&apos;s construction
            effortlessly. Our 360-degree view offers instant insights into the
            progress, ensuring you&apos;re always informed.
          </p>
        </div>

        <div className="justify-around items-center gap-1 w-full h-20 border border-white my-14 rounded-2xl bg-white/35 backdrop-blur-sm px-5 hidden md:flex">
          <h1 className="text-lg lg:text-xl font-semibold text-white">
            Portfolio Management
          </h1>
          <Separator />
          <h1 className="text-lg lg:text-xl font-semibold text-white">
            Property Management
          </h1>
          <Separator />
          <h1 className="text-lg lg:text-xl font-semibold text-white">
            Investment Advisory
          </h1>
        </div>
        
        <div className="marquee-container flex items-center md:hidden w-full h-20 border border-white my-14 rounded-2xl bg-white/35 backdrop-blur-sm">
          <div className="marquee">
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Portfolio Management
              </h1>
            </div>
            <div className="card">
              <Separator />
            </div>
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Property Management
              </h1>
            </div>
            <div className="card">
              <Separator />
            </div>
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Investment Advisory
              </h1>
            </div>
            <div className="card">
              <Separator />
            </div>
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Portfolio Management
              </h1>
            </div>
            <div className="card">
              <Separator />
            </div>
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Property Management
              </h1>
            </div>
            <div className="card">
              <Separator />
            </div>
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Investment Advisory
              </h1>
            </div>
            <div className="card">
              <Separator />
            </div>
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Portfolio Management
              </h1>
            </div>
            <div className="card">
              <Separator />
            </div>
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Property Management
              </h1>
            </div>
            <div className="card">
              <Separator />
            </div>
            <div className="card">
              <h1 className="text-lg lg:text-xl font-semibold text-white w-full">
                Investment Advisory
              </h1>
            </div>
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
        {homeimageslider.map((item, index) => (
          <SwiperSlide key={index}>
            <Image
              src={item.url}
              alt={item.url}
              layout="fill"
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <BgLayer />
    </section>
  );
};

export default Home;
