"use server";
import connectToDB from "@utils/database";
import Hall from "@models/hall";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    await connectToDB();
    const { location, ID } = await req.json();
    const docId = mongoose.Types.ObjectId(ID);
    console.log(typeof(docId))
    const res = await Hall.findByIdAndUpdate(docId, { location: location });
    return new Response("success", { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
