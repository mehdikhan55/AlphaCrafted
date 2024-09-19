import Image from "next/image";
import Hero from "../lib/components/Hero";
import Navbar from "../lib/components/Navbar";
import History from "@/lib/components/History";

export default function Home() {
  return (
    <>
    <Hero/>
    <History/>
    </>
  );
}
