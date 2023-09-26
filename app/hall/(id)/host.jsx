import { useEffect, useState } from "react";
import { getHost } from "./hostData";

const host = async (data) => {
  const [Info, setInfo] = useState({});

  useEffect(() => {
    const fetcher = async () => {
      const temp = await getHost(data);
      setInfo(temp);
    };
    fetcher();
  }, [data]);
  return (
    <div className="border-2 rounded-xl">
      <div className="flex">
        <div className="rounded-full p-2">
          <div className="bg-black text-white text-xl font-semibold items-center p-5 align-middle flex justify-center  rounded-full">
            {/* {(Info?.name || "").toUpperCase().charAt(0)} */}T
          </div>
        </div>
        <div>
          <div>{Info?.name} Turbo</div>
          <div>{Info?.email}sjdbfdj@jdjd.com</div>
          <div>{Info?.createdAt}2033-05-04</div>
        </div>
      </div>
    </div>
  );
};

export default host;
