import React from "react";
import PropertiesTable from "@/app/(main)/_components/properties-table";
import PropertyDialog from "../_components/property-dialog";

const Page = () => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Properties</h1>
        <PropertyDialog />
      </div>
      <PropertiesTable />
    </section>
  );
};

export default Page;
