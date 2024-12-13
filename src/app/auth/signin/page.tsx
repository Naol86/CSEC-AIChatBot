"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

type SignInFormType = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  // const { toast } = useToa

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogle = () => {
    const res = redirect(
      `https://stuck-selma-naolteach-82254a1d.koyeb.app/auth/google`
    );
    console.log("res is ", res);
  };
  const router = useRouter();

  const onSubmit = async (data: SignInFormType) => {
    const { email, password } = data;
    console.log(data);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("res is", res);
      if (res?.error) {
        // If there was an error with the credentials
        toast({
          title: "Sign In Failed",
          description: res.error,
          variant: "destructive",
        });
      } else if (res?.ok) {
        // If sign-in was successful
        toast({
          title: "Welcome back",
          description: "You have successfully signed in",
        });
        router.push("/ai"); // Use router.push for client-side navigation
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
                Welcome to Your AI Assistant 👋
              </h1>
              <h2 className="text-muted-foreground text-sm font-semibold text-gray-500">
                Ready to dive in? Ask questions, get insights, and explore
                possibilities.
              </h2>
              <h3 className="text-gray-600 font-semibold">
                Let’s chat and make things happen!
              </h3>
            </div>
            <div className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold ">
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
                            placeholder="At least 8 characters"
                            className="border-gray-50 text-white rounded-[10px] placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                        <div className="flex items-center justify-end">
                          <Link
                            className="text-sm text-blue-600 hover:text-blue-800"
                            href="#"
                          >
                            Forgot Password?
                          </Link>
                        </div>
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
                      <>Sign In</>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                variant="default"
                className="w-full rounded-[10px]"
                type="button"
                onClick={handleGoogle}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>
              <Button
                variant="default"
                className="w-full rounded-[10px]"
                type="button"
              >
                <svg
                  className="mr-2 h-4 w-4 fill-[#1877f2]"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.945 22v-8.834H7V9.485h2.945V6.54c0-3.043 1.926-4.54 4.64-4.54 1.3 0 2.418.097 2.744.14v3.18h-1.883c-1.476 0-1.82.703-1.82 1.732v2.433h3.68l-.736 3.68h-2.944L13.685 22"></path>
                </svg>
                Sign in with Facebook
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t you have an account?{" "}
              <Link
                className="text-blue-600 hover:text-blue-800"
                href="/auth/signup"
              >
                Sign up
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
