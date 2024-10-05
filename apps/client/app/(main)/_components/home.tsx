import React from "react";
import Navbar from "@/components/shared/navbar";
import ScreenWrapper from "@/components/wrapper/screen-wrapper";
import AvatarReview from "./avatar-review";
import BgLayer from "./bglayer";
import Separator from "./separator";

const Home = () => {
  return (
    <section className="h-screen overflow-hidden">
      <ScreenWrapper>
        <div className="flex justify-end items-end mt-32">
          <AvatarReview />
        </div>
        <div className="flex flex-col justify-center items-center mt-20 md:mt-5 z-10">
          <h1 className="font-[900] text-6xl md:text-8xl lg:text-9xl text-white text-center">
            GATEWAY TO YOUR DREAM HOMES
          </h1>
          <p className="text-xl text-white text-center max-w-2xl mt-10">
            Track the real-time status of your property&apos;s construction
            effortlessly. Our 360-degree view offers instant insights into the
            progress, ensuring you're always informed.
          </p>
        </div>
        <div className="hidden md:flex justify-around items-center bg-white/30 backdrop-blur-sm border-2 border-white rounded-3xl h-28 w-full mt-10 z-10">
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
      <div className="home-bg"></div>
      <BgLayer />
    </section>
  );
};

export default Home;
