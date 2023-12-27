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
        <div className="flex flex-row">
          {HostHalls.length > 0 && (
            <>
              <button>
                <Link href={`/dashboard/halls/${HostHalls[0]._id}/editor`}>
                  <span>{HostHalls[0].title}</span> {" > "}
                  <span>{HostHalls[0].location}</span>
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default halls;
