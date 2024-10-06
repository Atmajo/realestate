"use client";

import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/wrapper/screen-wrapper";
import AvatarReview from "./avatar-review";
import BgLayer from "./bglayer";
import Separator from "./separator";
import { homeimageslider } from "@/datas";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(true);
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % homeimageslider.length
        );
        setSlide(false);
      }, 0);
    }, 5000);

    return () => clearInterval(interval);
  }, [homeimageslider.length]);

  return (
    <section className="h-screen overflow-hidden">
      <ScreenWrapper>
        <div className="flex justify-end items-end mt-32 z-20">
          <AvatarReview />
        </div>
        <div className="flex flex-col justify-center items-center mt-20 md:mt-5 z-20">
          <h1 className="font-[900] text-6xl md:text-8xl text-white text-center">
            GATEWAY TO YOUR DREAM HOMES
          </h1>
          <p className="text-xl text-white text-center max-w-2xl mt-10">
            Track the real-time status of your property&apos;s construction
            effortlessly. Our 360-degree view offers instant insights into the
            progress, ensuring you&apos;re always informed.
          </p>
        </div>
        <div className="hidden md:flex justify-around items-center bg-white/30 backdrop-blur-sm border-2 border-white rounded-3xl h-28 w-full mt-10 z-20">
          <h1 className="text-lg md:text-xl lg:text-3xl font-semibold text-white">
            Portfolio Management
          </h1>
          <Separator />
          <h1 className="text-lg md:text-xl lg:text-3xl font-semibold text-white">
            Property Management
          </h1>
          <Separator />
          <h1 className="text-lg md:text-xl lg:text-3xl font-semibold text-white">
            Investment Advisory
          </h1>
        </div>
      </ScreenWrapper>
      <div className="flex flex-row">
        {homeimageslider.map(
          (data, index) =>
            index === currentIndex && (
              <div
                key={data.id}
                className={`home-bg ${slide ? "slide-out" : "slide-in"}`}
                style={{
                  backgroundImage: `url(${data.url})`,
                  backgroundSize: "cover",
                  backgroundOrigin: "center",
                  transition: "opacity 0.5s ease",
                }}
              ></div>
            )
        )}
      </div>
      {!slide && <BgLayer />}
    </section>
  );
};

export default Home;
