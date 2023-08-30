"use server";
import { getServerSession } from "next-auth";
import connectToDB from "@utils/database";
import Hall from "@models/hall";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const { location} = await req.json();
    const already = await Hall.findOne({ location: location });
    if (!already) {
      const newHall = new Hall({
        host: session?.user._id,
        location: location,
      });
      await newHall.save();
    }
    return new Response("success", { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};

