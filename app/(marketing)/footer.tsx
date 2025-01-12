import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Link href="/java">
          <Button size="lg" variant="ghost" className="w-full">
            <Image
              src="/images/java-original.svg"
              width={32}
              height={40}
              alt="Java Icon"
              className="font-feather mr-4 rounded-md flex flex-col"
            />
            Java
          </Button>
        </Link>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/images/python-original.svg"
            width={32}
            height={40}
            alt="Python Icon"
            className="font-feather mr-4 rounded-md flex flex-col"
          />
          Python
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/images/dataspell-original.svg"
            width={32}
            height={40}
            alt="Java Icon"
            className="font-feather mr-4 rounded-md flex flex-col"
          />
          Data Structures and Algorithms
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/images/devicon-original.svg"
            width={32}
            height={40}
            alt="Java Icon"
            className="font-feather mr-4 rounded-md flex flex-col"
          />
          Regular Expressions
        </Button>
      </div>
    </footer>
  );
};
