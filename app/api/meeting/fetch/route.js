"use server";
import { getServerSession } from "next-auth";
import connectToDB from "@utils/database";
import Meeting from "@models/meeting";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const resp = await Meeting.findOne({ host: session?.user._id });
    return new Response(JSON.stringify(resp), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
