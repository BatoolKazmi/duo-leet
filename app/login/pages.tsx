"use client";

import { useAuth } from "../context/AuthContext"; // Adjust path if needed

export default function Login() {
  const { signIn } = useAuth();

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
}
