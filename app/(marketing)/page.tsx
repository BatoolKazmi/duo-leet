import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div className=" font-feather flex flex-col items-center gap-y-8">
        <h1 className="font-feather lg: text-2xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master new concepts and languages with Duoleet.
        </h1>
      </div>

      {/* Wrap the Link component around the Button component */}
      <Link href="/dropdownmenu">
        <Button size="lg" variant="secondary" className="font-feather w-full">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
