"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ScreenWrapper from "@/components/wrapper/screen-wrapper";
import { completedpropertydata } from "@/datas";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import "@/styles/dots.css";
import { Timer } from "lucide-react";
import Link from "next/link";

const CompletedProperty = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % completedpropertydata.length
      );
    }, 5000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [completedpropertydata.length]);

  return (
    <section className="py-10 md:py-20 px-20 bg-gradient-to-br from-white to-sky-200 h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#333333] font-[800] text-5xl">
            Your Vision, Realized
          </h1>
          <p className="text-[#000000] font-[400] text-xl mt-5 max-w-xl">
            Step into your completed property—crafted to perfection, just the
            way you envisioned.
          </p>
        </div>
        <div>
          <Button variant="secondary" size="lg" className="font-semibold">
            View All
          </Button>
        </div>
      </div>
      <div className="">
        <div className="flex flex-row mt-10">
          {completedpropertydata
            .slice(currentIndex, currentIndex + 1)
            .map(
              (
                { id, name, company, location, size, price, image, link },
                index
              ) => (
                <div
                  key={id}
                  className={`flex md:flex-row flex-col justify-start items-start gap-10 p-4 border border-black rounded-xl w-full h-full slider-card ${index === currentIndex ? "active" : ""}`}
                >
                  <div className="flex">
                    <img src={image} alt="name" className="rounded-xl h-96" />
                  </div>
                  <div className="flex flex-1 flex-col mt-5">
                    <h1 className="text-[#333333] font-[600] text-4xl">
                      {name}
                    </h1>
                    <p className="text-lg">{company}</p>
                    <div className="flex flex-col justify-start items-start mt-5">
                      <div className="flex justify-center items-center gap-4 mt-5">
                        <img src="/icons/location.svg" alt="loc" />
                        <p className="text-[#000000] font-[400] text-xl">
                          {location}
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-4 mt-5">
                        <img src="/icons/home.svg" alt="" />
                        <p className="text-[#000000] font-[400] text-xl">
                          {size}
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-4 mt-5">
                        <img src="/icons/money.svg" alt="" />
                        <p className="text-[#000000] font-[400] text-xl">
                          {price}
                        </p>
                      </div>
                      <Link href={link}>
                        <Button
                          variant="default"
                          size="lg"
                          className="mt-10 font-semibold bg-[#333333] text-white"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-10 w-full">
                      <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-lg">Progress</h1>
                        <p className="font-semibold text-lg">100%</p>
                      </div>
                      <Progress value={progress} className="h-3 mt-2" />
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
        <div className="dots">
          {completedpropertydata.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => {
                setCurrentIndex(index);
              }}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedProperty;
