"use client";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import close from "@/Assets/close.png";
import { useNeighbourContext } from "@/Context/NeighbourlyContext";

type SigninFormValues = {
  email: string;
  password: string;
};

const Signin = () => {
  const { setsignup, setsignin, setshowlogin } = useNeighbourContext();
  //this is for shadcn not connected to backhend
  const form = useForm<SigninFormValues>({
    defaultValues: { email: "", password: "" },
  });


  const fetchlogin = async (values: SigninFormValues) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: true,
      });

      if (data) {
        toast(`SignIn successful! Welcome ${data.user.name}`);
      } else {
        console.log("Better Auth signIn error:", error);
        toast("SignIn failed");
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong");
    }
  };

  async function onSubmit(values: SigninFormValues) {
    console.log(values);
    setshowlogin(false)
    fetchlogin(values);
  }
  return (
    <div className=" mt-6">
      <div>
        <Card className="w-full max-w-sm">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </div>
            <Button
              className="pr-5"
              onClick={() => setshowlogin(false)}
            >
              {" "}
              <Image src={close} alt="close" className="w-3 mt-1 h-3" />{" "}
            </Button>
          </CardHeader>

          <CardContent>
                  <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Email</FormLabel>
                         <FormControl>
                           <Input placeholder="m@gmail.com" className="w-80" type="email" {...field} />
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
                         <FormLabel>Password</FormLabel>
                         <FormControl>
                           <Input  type="password" className="w-80" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                   <Button type="submit" size="lg" className="w-full bg-black text-white">
                           Log in
                         </Button>
                 
                 </form>
               </Form>
          </CardContent>
          <CardFooter className="flex-col">
            <p className="opacity-95 mb-4">or</p>
            <CardAction className="flex mt-4 text-[10px]">
              <p>Don't have an account?</p>
              <Button
                onClick={() => {
                  setsignup(true);
                  setsignin(false);
                }}
                className="text-[10px] pb-3 font-bold underline pl-1"
              >
                Sign up
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
