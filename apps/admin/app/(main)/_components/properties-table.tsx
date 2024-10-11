import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash } from "lucide-react";

const PropertiesTable = () => {
  return (
    <Table className="p-4 border rounded-xl my-5">
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Possession</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Services</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Serenity</TableCell>
          <TableCell>Luxury 4 BHK Villas and 3 BHK Apartments</TableCell>
          <TableCell>Dec, 2025</TableCell>
          <TableCell>Call for price</TableCell>
          <TableCell>Unfurnished</TableCell>
          <TableCell className="flex justify-start items-center gap-2">
            <button className="flex justify-center items-center bg-green-300 w-8 h-8 rounded-lg">
              <Eye size={24} className="text-green-600" />
            </button>
            <button className="flex justify-center items-center bg-orange-300 w-8 h-8 rounded-lg">
              <Trash size={24} className="text-orange-600" />
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PropertiesTable;
