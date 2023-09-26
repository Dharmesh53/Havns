import { dynamicBlurDataUrl } from "@utils/dynamicBlurData";
import { BiSolidPlusCircle } from "react-icons/bi";
import ImageBox from "./ImageBox";

const Images = async ({ value }) => {
  const placer = await Promise.all(value.map((url) => dynamicBlurDataUrl(url)));
  return (
    <div className="grid grid-cols-4 grid-rows-2 grid-flow-col gap-2 h-96">
      <div className="col-span-2 row-span-2 relative">
        <ImageBox
          link={value[0]}
          classes="rounded-tl-2xl rounded-bl-2xl"
          placeholder={placer[0]}
        />
      </div>
      <div className="relative ">
        <ImageBox link={value[1]} placeholder={placer[1]} />
      </div>
      <div className="relative">
        <ImageBox link={value[2]} placeholder={placer[2]} />
      </div>
      <div className="relative">
        <ImageBox
          link={value[3]}
          classes="rounded-tr-2xl"
          placeholder={placer[3]}
        />
      </div>
      <div className="relative w-full flex flex-col justify-center rounded-br-2xl items-center cursor-pointer overflow-hidden">
        <div className="absolute blur-lg z-[0] hover:blur-sm duration-300">
          <ImageBox link={value[4]} classes="rounded-br-2xl"/>
        </div>
        <button className="text-2xl z-[1] text-white pointer-events-none">
          <BiSolidPlusCircle />
        </button>
        <span className="z-[1] text-white pointer-events-none" >Show More</span>
      </div>
    </div>
  );
};

export default Images;
