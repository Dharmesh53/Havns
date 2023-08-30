import Image from "next/image";
import { BsPlus } from "react-icons/bs";
const Images = ({ value }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 grid-flow-col gap-1">
      <div className="col-span-2 row-span-2 relative h-80">
        <Image
          src={value[0]}
          alt="img"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="rounded-tl-2xl rounded-bl-2xl"
        />
      </div>
      <div className="relative ">
        <Image
          src={value[1]}
          alt="img"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="relative w-full">
        <Image
          src={value[2]}
          alt="img"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="relative w-full">
        <Image
          src={value[3]}
          alt="img"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="rounded-tr-2xl"
        />
      </div>
      <div className="relative w-full flex flex-col justify-center rounded-br-2xl items-center border-2 hover:bg-slate-100 cursor-pointer bg-slate-50">
        <button className="text-2xl ">
          <BsPlus />
        </button>
        Show More
      </div>
    </div>
  );
};

export default Images;
