// context/AuthContext.tsx

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

// Define the type for the AuthContext
interface AuthContextType {
  user: User | null;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

// Create the AuthContext with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props to accept children of type ReactNode
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user when auth state changes
    });

    return () => unsubscribe(); // Cleanup the subscription when the component is unmounted
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider); // Sign in with Google
  };

  const logOut = async () => {
    await signOut(auth); // Log out
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
