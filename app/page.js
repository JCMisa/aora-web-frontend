"use client"

import Image from "next/image";
import { images } from "../public/constants"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="p-10">
      <div className="flex items-center justify-center flex-col">
        <Image src={images.logo} alt="logo" width={100} height={100} />
        <Image src={images.cards} alt cards width={400} height={400} />

        <div className="text-center flex gap-4 flex-col mt-3">
          <h2 className="text-4xl">
            Discover Endless Possibilities with <span className="text-secondary">Aora</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </p>
          <Button className="bg-secondary text-primary font-bold hover:bg-secondary-200" onClick={() => router.push('/sign-in')}>
            Continue with Email
          </Button>
        </div>
      </div>
    </div>
  );
}
