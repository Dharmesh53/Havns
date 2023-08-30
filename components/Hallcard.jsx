import Image from "next/image";
import Link from "next/link";

const Hallcard = ({ title, photo, location, capacity, price,id }) => {
  return (
    <Link href={`/hall?id=${id}`}>
      <div className="border rounded-xl h-[22rem]">
        <div className="overflow-hidden flex items-center rounded-t-xl h-1/2">
          <Image
            src={photo}
            alt="image"
            layout="intrinsic"
            width={300}
            height={300}
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
