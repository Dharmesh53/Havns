'use client'
import { useEffect } from "react";

const meetingreq = () => {
  
  useEffect(() => {
    const fetcher = async() => {
      const res = await fetch("/api/meeting/fetch",{
        method:"GET"
      })
      const result = await res.json()
      console.log(result)
    }
    fetcher();
  }, []);

  return (
    <div>
      meetingreq
      <div></div>
    </div>
  );
};

export default meetingreq;
