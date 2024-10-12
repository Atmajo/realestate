import React from "react";
import PropertiesTable from "@/app/(main)/_components/properties-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Button variant="default">
          <Link href="/properties/add">Add Property</Link>
        </Button>
      </div>
      <PropertiesTable />
    </section>
  );
};

export default Page;
