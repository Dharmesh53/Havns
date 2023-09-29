import Prices from "./prices";
import Host from "./host";
import Facility from "./facilities";
import Tour from "./tour";

const description = ({ info }) => {
  return (
    <section className="flex gap-16">
      <div className="flex flex-col gap-7 w-[75%]">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl ">About the Hall</h1>
          <p className="text-justify">
            {info.description ? info.description : "loading...."}
          </p>
        </div>
        <hr />
        <Part
          heading={"Servies Provided"}
          component={<Facility points={info} />}
        />
        <Part
          heading={"Meet your Host "}
          component={<Host data={info.host} />}
        />
        <Part
          heading={"Arrange a Virtual Tour"}
          component={<Tour/>}
        />
      </div>
      <div className="w-[25%]">
        <Prices rates={info} />
      </div>
    </section>
  );
};

const Part = ({ heading, component }) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl">{heading}</h1>
        {component}
      </div>
      <hr />
    </>
  );
};

export default description;
