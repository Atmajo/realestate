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

const PropertyForm = () => {
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

  function onSubmit(values: z.infer<typeof PropertyFormSchema>) {
    console.log(format(values.possession, "yyyy-MM-dd"));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 h-full">
        <div className="flex justify-between items-center gap-2">
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
        <div className="flex justify-between items-center gap-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Ganges View" {...field} />
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
                  <Input placeholder="Ganges View" {...field} />
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
        <Button type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PropertyForm;
