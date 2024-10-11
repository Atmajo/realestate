import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PropertyForm from "../form/property-form";

const PropertyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="border px-4 py-2 rounded-lg bg-[#313131] text-white">
        Add Property
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Property</DialogTitle>
        </DialogHeader>
        <PropertyForm />
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDialog;
