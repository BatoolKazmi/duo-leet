"use client";

import { useAuth } from "../context/AuthContext";
import Login from "./login/pages";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link from Next.js

export const Header = () => {
  const { user, logOut } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <header className="h-20 w-full border-b-2 border-slate-200 px-4 flex justify-between items-center">
        <Link href= "/" className="font-feather text-2xl font-extrabold text-yellow-500 tracking-wide">
          Duo-leet
        
        </Link>
        <Button size="lg" variant="secondary" onClick={logOut}
          className = "font-feather bg-yellow-500 border-yellow-700 hover:bg-yellow-700 hover:border-yellow-700">
          Log out
        </Button>
      </header>
    </div>
  );
};
