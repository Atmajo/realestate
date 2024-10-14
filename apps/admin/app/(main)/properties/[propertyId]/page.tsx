import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ViewPropertyForm from "../../form/view-property-form";

const Page = ({ params }: PropertyViewProps) => {
  return (
    <section>
      <div className="flex gap-2 items-center">
        <Link href="/properties">
          <Button variant="ghost" size={"icon"}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-3xl font-semibold">View Property</h1>
      </div>
      <div className="mt-10">
        <ViewPropertyForm propertyId={params.propertyId!} />
      </div>
    </section>
  );
};

export default Page;
