'use client'
import Hero from "../lib/components/Hero";
import History from "../lib/components/PersonalHistory";
import { useUserContext } from "../context/userContext";
import { useEffect } from "react";
import Tabs from '/src/lib/components/Tabs';

export default function Home() {
  const {userData} = useUserContext();

  useEffect(()=>{
    console.log('user data is : ',userData);
  })

  return (
    <>
      <Hero />
      <Tabs/>
    </>
  );
}