import connectToDB from "@utils/database";
import Hall from "@models/hall";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const res = await Hall.find({ done: true });
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response({ msg: error }, { status: 500 });
  }
};
