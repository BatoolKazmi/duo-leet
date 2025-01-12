"use client";

import { useAuth } from "../context/AuthContext";
import Login from "../login/pages";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { user, logOut } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <header className="h-20 w-full border-b-2 border-slate-200 px-4">
        <h1 className=" font-feather text-2xl font-extrabold text-green-600 tracking-wide">
          Duo-leet
        </h1>
      </header>
      <div>
        <Button size="lg" variant="secondary" onClick={logOut}>
          Log out
        </Button>
      </div>
    </div>
  );
};
