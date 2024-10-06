"use client";

import { Button } from "@/components/ui/button";
import { completedpropertydata } from "@/datas";
import React, { useEffect, useState } from "react";
import Slider from "./slider";

import "@/styles/dots.css";

const UnderConstruction = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % completedpropertydata.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [completedpropertydata.length]);

  return (
    <section className="py-10 md:py-20 px-10 md:px-20">
      <div className="flex md:flex-row flex-col justify-start md:justify-between items-start md:items-center gap-5">
        <div>
          <h1 className="text-[#333333] font-[800] text-3xl md:text-5xl">
            On the Path to Completion
          </h1>
          <p className="text-[#000000] font-[400] text-lg md:text-xl mt-5 max-w-xl">
            Your property is taking shape—track every milestone as it moves
            closer to fulfillment
          </p>
        </div>
        <div>
          <Button
            variant="secondary"
            size="lg"
            className="font-semibold rounded-xl"
          >
            View All
          </Button>
        </div>
      </div>
      <div className="mt-10 mb-20">
        <Slider
          data={completedpropertydata}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
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

export default UnderConstruction;
