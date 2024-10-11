"use client";

import React from "react";
import SignInForm from "../form/sign-in-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Sign In</h1>
      <Link href={"/sign-up"}>
        <Button variant={"link"} className="text-sm">
          Don&apos;t have an account?{" "}
          <span className="text-[#346ebf]"> Sign Up</span>
        </Button>
      </Link>
      <div className="mt-10 flex md:flex-row flex-col items-center gap-5">
        <div className="w-80">
          <SignInForm />
        </div>
      </div>
    </section>
  );
};

export default Page;
