import { GiHighGrass } from "react-icons/gi";
import { MdEventSeat } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { LuWarehouse } from "react-icons/lu";

const facilties = ({ points }) => {
  const temp = [
    {
      name: "Halls",
      icon: <LuWarehouse />,
      data: points.halls ? points.halls : "----",
    },
    {
      name: "Seating",
      icon: <MdEventSeat />,
      data: points.seating ? points.seating + " / hall" : "----",
    },
    {
      name: "Max-Capacity",
      icon: <BsPeopleFill />,
      data: points.maxcapacity ? points.maxcapacity + " / hall" : "----",
    },
    {
      name: "Lawns",
      icon: <GiHighGrass />,
      data: points.lawns ? points.lawns : "----",
    },
  ];
  return (
    <div className="grid grid-flow-row grid-cols-2 grid-rows-2 gap-2">
      {temp.map(({ name, icon, data }) => (
        <div className="border-2 flex text-lg p-4 rounded-lg justify-between point">
          <div className="flex items-baseline gap-3">
            <span className="icon duration-150">{icon}</span>
            <span>{name}</span>
          </div>
          <span>{data}</span>
        </div>
      ))}
    </div>
  );
};

export default facilties;
