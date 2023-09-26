import Prices from "./prices";
import Host from "./host";
import Facility from "./facilities";

const description = ({ info }) => {
  return (
    <section className="flex gap-16">
      <div className="flex flex-col gap-14 w-[75%]">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl ">About the Hall</h1>
          <p className="text-justify">
            {info.description ? info.description : "loading...."}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">Servies Provided</h1>
          <span>
            <Facility points={info} />
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">Meet your Host </h1>
          <Host data={info.host} />
        </div>
      </div>
      <div className="w-[25%]">
        <Prices rates={info} />
      </div>
    </section>
  );
};

export default description;
