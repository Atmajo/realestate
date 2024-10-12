"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Loader2, Trash } from "lucide-react";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  fetchProperties,
  deleteProperty,
  updateProperty,
} from "@/redux/propertySlice";
import { toast } from "sonner";

const PropertiesTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.property
  );

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProperty(id)).unwrap();
      toast.success("Property deleted successfully");
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  const handleUpdate = async (property: Property) => {
    try {
      await dispatch(updateProperty(property)).unwrap();
      toast.success("Property updated successfully");
    } catch (error) {
      toast.error("Failed to update property");
    }
  };

  if (loading.fetchProperties) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Loader2 size={32} className="animate-spin ml-2" />
      </div>
    );
  }
  
  if (properties.length === 0) {
    return (
      <p className="text-sm text-center font-light">No properties found.</p>
    );
  }

  return (
    <Table className="p-4 rounded-xl my-5">
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Possession</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.name}</TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>{property.possession}</TableCell>
            <TableCell>{property.price}</TableCell>
            <TableCell>{property.status}</TableCell>
            <TableCell className="flex justify-start items-center gap-2">
              <button
                className="flex justify-center items-center bg-green-300 w-8 h-8 rounded-lg"
                onClick={() => handleUpdate(property)}
                disabled={loading.updateProperty}
              >
                <Eye size={24} className="text-green-600" />
              </button>
              <button
                className="flex justify-center items-center bg-orange-300 w-8 h-8 rounded-lg"
                onClick={() => handleDelete(property.id)}
                disabled={loading.deleteProperty}
              >
                <Trash size={24} className="text-orange-600" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropertiesTable;
