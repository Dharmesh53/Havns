"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const halls = () => {
  const [HostHalls, setHostHalls] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/hall/host", {
        method: "GET",
      });
      const result = await res.json();
      setHostHalls(result);
    };
    fetcher();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-5 justify-center text-lg">
        <div>You are hosting these halls</div>
        <div className="flex flex-col">
          {HostHalls.length > 0 &&
            HostHalls.map((hall) => {
              return (
                <button>
                  <Link href={`/dashboard/halls/${hall._id}/editor`}>
                    <span>{hall.title}</span> {" > "}
                    <span>{hall.location}</span>
                  </Link>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default halls;
