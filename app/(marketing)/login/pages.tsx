// pages/login.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth(); // Use the signIn function from context
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(); // Trigger sign-in
      router.push("/"); // Redirect to home after successful login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="font-feather text-2xl mb-4">Login</h2>
        <Button
          onClick={handleLogin}
          size="lg"
          variant="secondary"
          className = "w-full font-feather bg-yellow-500 border-yellow-700 hover:bg-yellow-700 hover:border-yellow-700">
          Login with Google
        </Button>
      </div>
    </div>
  );
}
