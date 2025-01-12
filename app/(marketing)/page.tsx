import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';  


export default function Home() {
  return (
    <div>
      <div className = "flex justify-center items-center ">
      <Image 
            src="/images/duoleet-eagle.png" 
            width={150} 
            height={180}
            alt="Duoleet Eagle"
            className="font-feather mr-4 rounded-md flex flex-colblock transform translate-x-[-30px] translate-y-[-20px]">
              </Image></div> 
        <div className=" font-feather flex flex-col items-center gap-y-8">
        <h1 className="p-2 font-feather lg: text-2xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master new concepts and languages with Duoleet.
        </h1>
      </div>

      {/* Wrap the Link component around the Button component */}
      <Link href="/dropdownmenu">
        <Button size="lg" variant="secondary" className=" mb-4 font-feather w-full bg-yellow-500 border-yellow-700 hover:bg-yellow-700">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
