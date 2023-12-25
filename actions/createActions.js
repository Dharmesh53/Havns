"use server";
import connectToDB from "@utils/database";
import Hall from "@models/hall";
import mongoose from "mongoose";

export async function updateCapacity({
  ID,
  halls,
  seating,
  maxcapacity,
  lawns,
}) {
  try {
    await connectToDB();
    var docId = new mongoose.Types.ObjectId(ID);
    await Hall.findOneAndUpdate(
      { _id: docId },
      { halls: halls, seating: seating, maxcapacity: maxcapacity, lawns: lawns }
    );
    return { msg: "success" };
  } catch (e) {
    return new Response(e);
  }
}

export async function updatePrice({ Data, locationID }) {
  try {
    var doc_id = new mongoose.Types.ObjectId(locationID);
    await connectToDB();
    await Hall.findOneAndUpdate(
      { _id: doc_id },
      { veg: Data.Veg, nonveg: Data.Nonveg, decor: Data.Decor, room: Data.Room }
    );
    return { msg: "success" };
  } catch (error) {
    return { msg: "error" };
  }
}

export async function updateFeature({ Feature, locationID }) {
  try {
    var doc_id = new mongoose.Types.ObjectId(locationID)
    await connectToDB();
    await Hall.findOneAndUpdate(
      { _id: doc_id },
      { title: Feature.title, description: Feature.description, done: true }
    );
    return { msg: "success" };
  } catch (error) {
    return { msg: "error" };
  }
}