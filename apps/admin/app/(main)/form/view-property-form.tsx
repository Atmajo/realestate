"use client";

import React, { useEffect } from "react";
import { fetchPropertyById, updateProperty } from "@/redux/propertySlice";
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
import { ArrowLeft, CalendarIcon, Eye, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/utils/uploadthing";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ImageSlider from "../_components/image-slider";

const ViewPropertyForm = ({ propertyId }: { propertyId: string }) => {
  const [images, setImages] = React.useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.property);

  const form = useForm<z.infer<typeof PropertyFormSchema>>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: {
      name: "",
      type: "",
      possession: new Date(),
      price: "",
      status: "",
      place: "",
      company: "",
      size: "",
      image: [],
      insideImg: [],
      desc: "",
      startDate: new Date(),
    },
  });

  useEffect(() => {
    dispatch(fetchPropertyById(propertyId)).then((action) => {
      const isValidDate = (date: any) => !isNaN(new Date(date).getTime());

      form.reset({
        ...action.payload?.property,
        image: action.payload?.property.image || [],
        insideImg: action.payload?.property.insideImg || [],
        possession: isValidDate(action.payload?.property.possession)
          ? new Date(action.payload?.property.possession)
          : new Date(),
        startDate: isValidDate(action.payload?.property.startDate)
          ? new Date(action.payload?.property.startDate)
          : new Date(),
      });

      console.log(images);
    });
  }, [dispatch]);

  const handleDeleteImage = (index: number) => {
    const currentImages: string[] = form.getValues("image") || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue("image", newImages);
  };

  const handleDeleteInsideImage = (index: number) => {
    const currentInsideImages = form.getValues("insideImg") || [];
    const newInsideImages = currentInsideImages.filter((_, i) => i !== index);
    form.setValue("insideImg", newInsideImages);
  };

  const onSubmit = async (propertyData: z.infer<typeof PropertyFormSchema>) => {
    try {
      const data = {
        ...propertyData,
        possession: format(propertyData.possession, "yyyy-MM-dd"),
        startDate: format(propertyData.startDate!, "yyyy-MM-dd"),
        id: propertyId!,
      };

      await dispatch(updateProperty(data))
        .unwrap()
        .then(() => {
          toast.success("Property updated successfully");
        });
    } catch (error) {
      console.log(error);
      toast.error("Error updating property");
    }
  };

  if (loading.fetchProperty) {
    return (
      <section className="flex justify-center items-center h-full">
        <Loader2 size={32} className="animate-spin" />
      </section>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <div className="flex justify-between gap-5">
          <div className="flex flex-col items-center gap-5 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Project <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ganges View"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>
                          Type <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="4BHK Villa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="place"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Place</FormLabel>
                        <FormControl>
                          <Input placeholder="Goa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Naturals" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex justify-between items-center gap-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Price <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Call to enquire" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Input placeholder="3000 Sq. Ft." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="The villa with luxury comfort"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col items-center gap-5 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>
                        Status <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Furnished">Furnished</SelectItem>
                          <SelectItem value="Fully Furnished">
                            Fully Furnished
                          </SelectItem>
                          <SelectItem value="Unfirnished">
                            Unfirnished
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col mt-2">
                      <FormLabel>Start Date</FormLabel>
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
                <FormField
                  control={form.control}
                  name="possession"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col mt-2">
                      <FormLabel>
                        Possession <span className="text-red-600">*</span>
                      </FormLabel>
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
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Pictures</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex justify-center items-center bg-green-300 w-8 h-8 rounded-lg">
                      <Eye size={24} className="text-green-600" />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <ImageSlider
                      images={form.getValues("image") || []}
                      insideImages={form.getValues("insideImg") || []}
                      onDeleteImage={handleDeleteImage}
                      onDeleteInsideImage={handleDeleteInsideImage}
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div>
                  <Label>Images</Label>
                  <div className="flex">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        res.forEach((element) => {
                          form.setValue("image", [
                            ...(form.getValues("image") || []),
                            element.url,
                          ]);
                        });
                        toast.success("Image uploaded successfully");
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label>Inside Images</Label>
                  <div className="flex">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        res.forEach((element) => {
                          form.setValue("insideImg", [
                            ...(form.getValues("insideImg") || []),
                            element.url,
                          ]);
                        });
                        toast.success("Image uploaded successfully");
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-5"
          disabled={loading.updateProperty}
        >
          {loading.updateProperty ? (
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

export default ViewPropertyForm;
