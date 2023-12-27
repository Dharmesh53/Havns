"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const layout = ({ children }) => {
  const pathname = usePathname();
  const id = pathname.substring(17, 41);

  return (
    <div>
      <div className="flex justify-center items-center gap-5">
        <button>
          <Link href={`/dashboard/halls/${id}/editor`}>Editor</Link>
        </button>
        <button>
          <Link href={`/dashboard/halls/${id}/meetingreq`}>
            meeting request
          </Link>
        </button>
        <button>
          <Link href={`/dashboard/halls/${id}/bookingreq`}>
            booking request
          </Link>
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
