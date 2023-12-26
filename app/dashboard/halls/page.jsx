import React from "react";
import Link from "next/link"

const halls = () => {
  return (
    <div>
      <div className="flex gap-5 justify-center text-lg">
        <button>
          <Link href="/dashboard/halls/editor">hallsEditor</Link>
        </button>
        <button>
          <Link href="/dashboard/halls/meetingreq">meeting request</Link>
        </button>
        <button>
          <Link href="/dashboard/halls/bookingreq">booking request</Link>
        </button>
      </div>
    </div>
  );
};

export default halls;
