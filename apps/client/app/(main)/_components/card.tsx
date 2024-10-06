import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { calculateProgress } from "@/utils/calculateProgress";

interface CardProps {
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
  isActive: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  company,
  location,
  size,
  price,
  image,
  link,
  startDate,
  endDate,
  isActive,
}) => {
  const progress = calculateProgress(startDate, endDate);

  return (
    <div
      key={id}
      className={`flex flex-col md:flex-row justify-start items-start gap-4 md:gap-10 p-4 border border-black rounded-xl w-full h-full slider-card ${isActive ? "active" : ""}`}
    >
      <div className="flex w-full md:w-auto">
        <img
          src={image}
          alt={name}
          className="rounded-xl w-full md:w-auto h-48 md:h-96 object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col mt-5 md:mt-0 w-full">
        <h1 className="text-[#333333] font-[600] text-2xl md:text-4xl">
          {name}
        </h1>
        <p className="text-md md:text-lg">{company}</p>
        <div className="flex flex-col justify-start items-start mt-5">
          <div className="flex justify-center items-center gap-2 md:gap-4 mt-2 md:mt-5">
            <img
              src="/icons/location.svg"
              alt="loc"
              className="w-4 md:w-auto"
            />
            <p className="text-[#000000] font-[400] text-sm md:text-xl">
              {location}
            </p>
          </div>
          <div className="flex justify-center items-center gap-2 md:gap-4 mt-2 md:mt-5">
            <img src="/icons/home.svg" alt="" className="w-4 md:w-auto" />
            <p className="text-[#000000] font-[400] text-sm md:text-xl">
              {size}
            </p>
          </div>
          <div className="flex justify-center items-center gap-2 md:gap-4 mt-2 md:mt-5">
            <img src="/icons/money.svg" alt="" className="w-4 md:w-auto" />
            <p className="text-[#000000] font-[400] text-sm md:text-xl">
              {price}
            </p>
          </div>
          <Link href={link}>
            <Button
              variant="default"
              size="lg"
              className="mt-5 md:mt-10 font-semibold bg-[#333333] text-white"
            >
              View Details
            </Button>
          </Link>
        </div>
        <div className="mt-5 md:mt-10 w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-md md:text-lg">Progress</h1>
            <p className="font-semibold text-md md:text-lg">
              {progress.toFixed(2)}%
            </p>
          </div>
          <Progress value={progress} className="h-2 md:h-3 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default Card;
