"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Import router for client-side navigation
import { signIn } from "next-auth/react";

const Callback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    const login = async (token: string) => {
      try {
        const result = await signIn("google-credentials", {
          token,
          redirect: false,
        });
        if (result?.ok) {
          // Successful sign-in
          router.push("/ai");
        } else {
          // Handle sign-in errors
          console.error("Sign-in error:", result?.error);
          router.push("/error"); // Redirect to an error page
        }
      } catch (err) {
        console.error("Unexpected error during sign-in:", err);
        router.push("/error"); // Redirect to an error page
      }
    };

    if (token) {
      login(token);
    } else {
      console.error("Token missing in query parameters");
      router.push("/error"); // Redirect to an error page
    }
  }, [searchParams, router]);

  return <p>Loading...</p>;
};

export default Callback;

