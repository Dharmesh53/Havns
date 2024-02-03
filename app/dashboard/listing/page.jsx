"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const listing = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/hall/host/notDone", {
        method: "GET",
      });
      const result = await res.json();
      setData(result);
    };
    fetcher();
  }, []);

  return (
    <div>
      <div>These are the halls that are not completed !!</div>
      <div className="flex flex-row">
        {data.length > 0 && (
          <>
            <button>
              <Link href={`/protected/become-host/${data[0]._id}`}>
                <span>{data[0].title}</span> {" > "}
                <span>{data[0].location}</span>
              </Link>
            </button>
          </>
        )}
      </div>
      <button>
        <Link href={"/protected/become-host"}>Add New Hall</Link>
      </button>
    </div>
  );
};

export default listing;
