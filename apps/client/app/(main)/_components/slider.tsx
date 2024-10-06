// Slider.tsx
import React, { useState } from "react";
import Card from "./card";

import "@/styles/slider.css"; // Import the CSS file for animations

interface SliderProps {
  data: Array<{
    id: number;
    name: string;
    company?: string;
    location: string;
    size?: string;
    price: string;
    image: string;
    startDate: Date;
    endDate: Date;
    link: string;
  }>;
  currentIndex: number;
  setCurrentIndex: (updateIndex: (prevIndex: number) => number) => void;
}

const Slider: React.FC<SliderProps> = ({
  data,
  currentIndex
}) => {
  return (
    <div className="slider-container">
      <div className="slider">
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`slider-item ${index === currentIndex ? "active" : ""}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <Card {...item} isActive={index === currentIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
