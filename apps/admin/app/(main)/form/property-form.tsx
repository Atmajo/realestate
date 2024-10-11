"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PropertyFormSchema } from "@/schema/property-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { Loader2 } from "lucide-react";
import { createProperty } from "@/redux/propertySlice";
import { toast } from "sonner";

const PropertyForm = () => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.property
  );

  const form = useForm<z.infer<typeof PropertyFormSchema>>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: {
      project: "",
      type: "",
      possession: new Date(),
      price: "",
      status: "",
      location: "",
    },
  });

  async function onSubmit(propertyData: any) {
    try {
      await dispatch(createProperty(propertyData)).unwrap();
      toast.success("Property created successfully");
    } catch (error) {
      toast.error("Failed to create property");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <div className="flex justify-between items-center gap-2 mt-2">
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <FormControl>
                  <Input placeholder="Ganges View" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="4BHK Villa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center gap-2 mt-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Call to enquire" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input placeholder="Furnished" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="possession"
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col mt-2">
              <FormLabel>Possession</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"secondary"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-white"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-5" disabled={loading}>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin mr-2" />
              Submitting
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PropertyForm;
