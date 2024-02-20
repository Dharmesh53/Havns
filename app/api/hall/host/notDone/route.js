import connectToDB from "@utils/database";
import Hall from "@models/hall";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const res = await Hall.find({ host: session.user._id, done: false });
    const res1 = res.map(async (hall) => {
      const photoRes = await fetch(
        `${process.env.CLIENT_URL}/api/photo/${hall._id}`,
      );
      return photoRes.json();
    });
    const photoData = await Promise.all(res1);
    let finalData = res1.map((hall, idx) => {
      return {
        ...hall,
        photo: photoData[idx] ? true : false,
      };
    });
    return new Response(JSON.stringify(finalData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
};
