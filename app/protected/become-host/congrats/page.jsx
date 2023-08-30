"use client";
import "@styles/congrats.css";
import Animate from "./animate";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [Counter, setCounter] = useState(10);
  setInterval(() => {
    if(Counter>0){
        setCounter(Counter-1);
    }
  }, 1000);
  const router = useRouter();
  if(Counter === 0) {
    router.push("/protected/account")
  }
  return (
    <>
      <Animate />
      <div className="mt-5 flex flex-col justify-center items-center gap-5 absolute ">
        <h1 className="text-6xl font-extrabold"> Congratulations </h1>
        <h3 className="text-xl font-semibold">
          {" "}
          Your place has been successfully registered.
        </h3>
        <p className="text-lg">
          You will be automatically redirected to your profile page in{" "}
          <span className="font-bold">{Counter}s</span>
        </p>
      </div>
    </>
  );
};

export default Page;
