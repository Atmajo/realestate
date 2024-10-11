"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUpForm from "../form/sign-up-form";

const Page = () => {
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
      </div>
    </section>
  );
};

export default Page;
