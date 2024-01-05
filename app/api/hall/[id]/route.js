import connectToDB from "@utils/database";
import Hall from "@models/hall";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const res = await Hall.findOne({ _id: params.id });
    if (res.host == session?.user._id) {
      return new Response(JSON.stringify(res), { status: 200 });
    } else {
      return new Response("sneaky", { status: 404 });
    }
  } catch (error) {
    return new Response({ msg: error }, { status: 500 });
  }
};
