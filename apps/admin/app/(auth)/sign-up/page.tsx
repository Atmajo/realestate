"use client";

import React from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import SignUpForm from "../form/sign-up-form";

const Page = () => {
  const { login } = useAuth();
  
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Sign Up</h1>
      <Link href={"/sign-in"}>
        <Button variant={"link"} className="text-sm">
          Already have an account?{" "}
          <span className="text-[#346ebf]"> Sign In</span>
        </Button>
      </Link>
      <div className="mt-10 flex md:flex-row flex-col items-center gap-5">
        <div className="w-80">
          <SignUpForm />
        </div>

        <div className="hidden flex-col justify-center items-center h-full mx-4 md:flex">
          <div className="flex flex-col items-center h-full">
            <hr className="h-full mb-2 w-px bg-gray-300" />
            <span className="text-lg font-semibold">OR</span>
            <hr className="h-full mt-2 w-px bg-gray-300" />
          </div>
        </div>

        <div className="flex flex-row justify-center items-center mx-4 w-full md:hidden">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-lg font-semibold">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex justify-center items-center">
          <Button onClick={() => login()} className="">
            <div className="flex justify-center items-center p-4">
              <Image
                src={"/icons/google.svg"}
                alt="google"
                width={32}
                height={100}
              />
              <h1>Sign Up With Google</h1>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
