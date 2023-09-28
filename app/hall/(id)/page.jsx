"use client";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PiMapPinBold } from "react-icons/pi";
import Images from "@components/Images";
import { getData } from "./data";
import ImgSkeleton from "./ImgSkeleton";
import Description from "./description";

const Map = dynamic(() => import('@components/map'), {
  loading: () => <p>Loading...</p>,
})
 
const Page = async () => {
  const [data, setData] = useState({});
  const searchParams = useSearchParams();
  const locationId = searchParams.get("id");
  useEffect(() => {
    const fetcher = async () => {
      const temp = await getData(locationId);
      setData(temp);
    };
    fetcher();
  }, [locationId]);
  return (
    <div className="flex justify-center items-center ">
      <div className="flex justify-center w-[79vw]">
        <div>
          <section className="my-10">
            <div className="my-5">
              <span className="font-bold flex items-center gap-2 text-xl">
                <PiMapPinBold />
                {data.location ? data.location : "loading...."}
              </span>
              <h2 className="font-medium underline ">{data.title}</h2>
            </div>
            {!data.photos && <ImgSkeleton />}
            {data.photos && <Images value={data.photos} />}
          </section>
          <Description info={data} />
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Page;
