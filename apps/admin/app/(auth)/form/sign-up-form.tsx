import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import Link from "next/link";
import { SignUpFormSchema } from "@/schema/sign-up-form";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { signUp } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
    dispatch(signUp(data));
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Name</FormLabel>
              <FormControl>
                <Input placeholder="John Wick" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johnwick@gmail.com"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center">
          <Link href={"forgot-password"}>
            <Button variant={"link"}>Forgot Password?</Button>
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin mr-2" />
              Signing UP
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
