"use client";
import HallCard from "./Hallcard";
import { useEffect, useState } from "react";

const Feed = () => {
  const [Halls, setHalls] = useState([]);

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
        const hallsData = locationsData.map((location, index) => {
          return {
            ...location,
            photos: photos[index],
          };
        });
        setHalls(hallsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex justify-center items-center gap-8 p-20 flex-wrap">
      {Halls.map((item, i) => {
        if (item.location !== "") {
          return (
            <HallCard
              key={i}
              id={item._id}
              photo={item.photos.secure_url}
              title={item.title}
              location={item.location}
              capacity={item.maxcapacity}
              price={item.veg}
            />
          );
        }
      })}
    </div>
  );
};

export default Feed;
