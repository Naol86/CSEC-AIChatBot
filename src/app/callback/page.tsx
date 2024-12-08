"use client";
import { Suspense } from "react";
import Callback from "./Callback";

export default function page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Callback />
    </Suspense>
  );
}
