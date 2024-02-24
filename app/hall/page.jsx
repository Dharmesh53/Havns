"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PiMapPinBold } from "react-icons/pi";
import Images from "@components/Images";
import { getData } from "./data";
// import ImgSkeleton from "./ImgSkeleton";
import Description from "./description";
import Reviews from "@components/reviews/AllReviews";
import Footer from "./footer";
import Viewer from "@app/hall/imgView";
import { AnimatePresence, motion } from "framer-motion";

const Map = dynamic(() => import("@components/map/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Page = () => {
  const [data, setData] = useState({});
  const searchParams = useSearchParams();
  const [view, setView] = useState(null);

  const locationId = searchParams.get("id");

  useEffect(() => {
    const fetcher = async () => {
      const temp = await getData(locationId);
      setData(temp);
    };
    fetcher();
  }, [locationId]);

  return (
    <div className="relative">
      {!view ? (
        <div className="flex justify-center flex-col items-center mt-8">
          <div className="flex justify-center w-[79vw]">
            <div className="flex flex-col gap-10">
              {data && data.location && data.title ? (
                <>
                  <section>
                    <div className="my-5">
                      <span className="font-bold flex items-center gap-2 text-xl">
                        <PiMapPinBold />
                        {data.location}
                      </span>
                      <h2 className="font-medium underline ">{data.title}</h2>
                    </div>
                    {/* {!data.photos && <ImgSkeleton /> */}
                    {data.photos && (
                      <Images value={data.photos} setView={setView} />
                    )}
                  </section>
                  <section>
                    <Description info={data} />
                  </section>
                  <section>
                    {data.location && <Map location={data.location} />}
                  </section>
                  <section>
                    <Reviews Id={data._id} />
                  </section>
                </>
              ) : (
                <div className="flex justify-center items-center mt-8">
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <Viewer value={data.photos} setView={setView} />
        </div>
      )}
    </div>
  );
};

export default Page;
