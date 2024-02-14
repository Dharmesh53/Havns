"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      if (session) {
        const res = await fetch(`/api/wishlist/${session?.user._id}`);
        const userData = await res.json();

        const hallPromise = userData.liked.map(async (id) => {
          const response = await fetch(`/api/wishlist/hall/${id}`);
          return response.json();
        });
        const hallData = await Promise.all(hallPromise);
        setHalls(hallData);
      }
    };

    fetcher();
  }, [session]);

  return (
    <div>
      Wishlist
      <div className="flex flex-col">
        {halls.map((hall, i) => {
          return (
            <div key={i} className="flex gap-5">
              <span>{hall.title}</span>
              <span>{hall.location}</span>
              <span>{hall.halls}</span>
              <span>{hall.seating}</span>
              <span>{hall.maxcapacity}</span>
              <span>{hall.lawns}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
