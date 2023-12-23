"use client"
import ImageBox from "./ImageBox";
import { dynamicBlurDataUrl } from "@utils/dynamicBlurData";
import Link from "next/link";

const Hallcard = async({ title, photo, location, capacity, price,id }) => {
  const placer = await dynamicBlurDataUrl(photo)
  return (
    <Link href={`/hall?id=${id}`}>
      <div className="border rounded-xl h-[22rem] hallcard duration-300 ease-out">
        <div className="overflow-hidden flex items-center rounded-t-xl h-1/2">
          <ImageBox
            link={photo}
            placeholder={placer}
            feed = {true}
          />
        </div>
        <div className="relative h-1/2 w-[300px] p-3">
          <div className="font-semibold text-lg">{title}</div>
          <div className="text-gray-600 text-sm">{location}</div>
          <span className="text-gray-600 text-sm">Up to {capacity} People</span>
          <div className="absolute bottom-0 pb-3 flex text-sm justify-between">
            <span>₹ {price} per vegetarian plate.</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Hallcard;
