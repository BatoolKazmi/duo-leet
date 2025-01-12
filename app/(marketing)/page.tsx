import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-feather flex flex-col items-center gap-y-8">
      <h1 className="font-feather text-xl lg:text-2xl font-bold text-neutral-600 max-w-[480px] text-center mb-4">
        Learn, practice, and master new concepts and programming languages with Duoleet.
      </h1>
      {/* This div was missing the 'className' */}
      <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
        {/* Add content or buttons as needed here */}
      </div>

      {/* Wrap the Link component around the Button component */}
      <Link href="/buttons">
        <Button size="lg" variant="secondary" className="font-feather w-full">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
