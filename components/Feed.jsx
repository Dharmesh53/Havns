"use client";
import HallCard from "./Hallcard";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "./Loading";
import { useSearchContext } from "@context/searchContext";

const Feed = () => {
  const [Halls, setHalls] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const { query } = useSearchContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const locationsResponse = await fetch(`api/hall`);
        const locationsData = await locationsResponse.json();

        const photosPromises = locationsData.map(async (location) => {
          const photoResponse = await fetch(`api/photo/${location._id}`);
          const photoData = await photoResponse.json();
          return photoData;
        });
        const photos = await Promise.all(photosPromises);

        var userData = null;
        if (session) {
          const userRes = await fetch(`/api/hosts/${session?.user._id}`);
          userData = await userRes.json();
        }

        const hallsData = locationsData.map((location, index) => {
          return {
            ...location,
            photos: photos[index],
            isLiked: userData.liked.includes(location._id),
          };
        });

        setHalls(hallsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getData();
  }, [session]);

  const filteredData = useMemo(() => {
    if (query === "") {
      return Halls;
    }
    return Halls.filter((hall) => {
      return hall.location.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, Halls]);

  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-8 p-20 flex-wrap">
          {filteredData.map((item, i) => {
            return (
              <HallCard
                key={i}
                id={item._id}
                photo={item.photos.secure_url}
                title={item.title}
                location={item.location}
                capacity={item.maxcapacity}
                price={item.veg}
                isLiked={item.isLiked}
                session={session?.user._id ? true : false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Feed;
