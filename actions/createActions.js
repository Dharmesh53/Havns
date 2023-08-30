"use server";
import connectToDB from "@utils/database";
import Hall from "@models/hall";

export async function updateCapacity({
  location,
  halls,
  seating,
  maxcapacity,
  lawns,
}) {
  try {
    await connectToDB();
    const res = await Hall.findOneAndUpdate(
      { location: location },
      { halls: halls, seating: seating, maxcapacity: maxcapacity, lawns: lawns }
    );
    return { msg: "success" };
  } catch (e) {
    return new Response(e);
  }
}

export async function updatePrice({ Data, Address }) {
  try {
    await connectToDB();
    const res = await Hall.findOneAndUpdate(
      { location: Address.loca },
      { veg: Data.Veg, nonveg: Data.Nonveg, decor: Data.Decor, room: Data.Room }
    );
    return { msg: "success" };
  } catch (error) {
    return { msg: "error" };
  }
}

export async function updateFeature({ Feature, Address }) {
  try {
    await connectToDB();
    const res = await Hall.findOneAndUpdate(
      { location: Address.loca },
      { title: Feature.title, description: Feature.description,done:true }
    );
    return { msg: "success" };
  } catch (error) {
    return { msg: "error" };
  }
}
