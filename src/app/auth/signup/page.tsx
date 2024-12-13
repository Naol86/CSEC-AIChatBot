"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Full name is required" }),
});

type SignUpFormType = z.infer<typeof signUpSchema>;

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormType) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await fetch(
        "https://stuck-selma-naolteach-82254a1d.koyeb.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast({
          title: "Sign Up Successful",
          description: "Welcome! Go to Your email and Verify.",
        });
        router.push("/auth/signin");
      } else {
        const errorData = await response.json();
        toast({
          title: "Sign Up Failed",
          description: errorData.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 pb-3">
      <div className="flex w-full flex-col justify-center items-center h-full order-2 md:order-1">
        <div className="mx-auto w-full max-w-md px-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight">
                Create Your Account 👋
              </h1>
              <h2 className="text-muted-foreground text-sm font-semibold text-gray-500">
                Ready to join us? Fill in your details and get started.
              </h2>
            </div>
            <div className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold ">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="First Name"
                            className="border-gray-50 text-white rounded-[10px] placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Last Name"
                            className="border-gray-50 text-white rounded-[10px] placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Full Name"
                            className="border-gray-50 text-white rounded-[10px] placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Example@email.com"
                            className="border-gray-50 text-white rounded-[10px] placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="At least 6 characters"
                            className="border-gray-50 text-white rounded-[10px] placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-[10px]"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                    ) : (
                      <>Sign Up</>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                className="text-blue-600 hover:text-blue-800"
                href="/auth/signin"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="order-1 md:order-2 relative w-full h-full min-h-[40vh]">
        <Image
          src="/image_fx_.jpg"
          alt="Decorative floral still life painting"
          fill
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
