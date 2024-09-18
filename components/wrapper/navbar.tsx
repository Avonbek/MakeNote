"use client";
import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";
import { UserProfile } from "../user-profile";
import ModeToggle from "../mode-toggle";

export default function NavBar() {
  return (
    <div className="flex min-w-full fixed justify-between p-2 border-b z-10 dark:bg-black dark:bg-opacity-50 bg-white">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <span>AI Notes App</span>
      </Link>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <UserProfile />
      </div>
    </div>
  );
}
