"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PiMapPinBold } from "react-icons/pi";
import Images from "@components/Images";

const Page = () => {
  const [data, setData] = useState({});
  const searchParams = useSearchParams();
  const locationId = searchParams.get("id");

  useEffect(() => {
    const fetcher = async () => {
      try {
        const locationRes = await fetch(`api/hall/${locationId}`);
        const locationData = await locationRes.json();

        const photoRes = await fetch(`api/photos/${locationData._id}`);
        const photoData = await photoRes.json();

        const locatWithPhoto = {
          ...locationData,
          photos: photoData.map((photo) => photo.secure_url),
        };
        setData(locatWithPhoto);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetcher();
  }, [locationId]);
  console.log(data);

  return (
    <div className="mx-20">
      <section className="my-10">
        <div className="my-5">
          <span className="font-bold flex items-center gap-2 text-xl">
            <PiMapPinBold />
            {data.location}
          </span>
          <h2 className="font-medium underline ">{data.title}</h2>
        </div>
        <Images value={data?.photos || []} />
      </section>
      <section className="grid grid-col-5 grid-flow-col">
        <div className="col-span-2 bg-green-400">
          <div className="max-w-2xl">
            <h1 className="font-bold text-xl">About the Hall</h1>
            <span>{data.description}</span>
          </div>
        </div>
        <div className="bg-red-500">book</div>
      </section>
    </div>
  );
};

export default Page;
