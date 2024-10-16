import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PropertyForm from "../../form/property-form";
import Link from "next/link";

const Page = () => {
  return (
    <section>
      <div className="flex justify-between items-center h-full">
        <div className="flex gap-2 justify-center items-center">
          <Link href="/properties">
            <Button variant="ghost" size={"icon"}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Add Properties</h1>
        </div>
      </div>
      <div className="mt-5 h-full">
        <PropertyForm />
      </div>
    </section>
  );
};

export default Page;
