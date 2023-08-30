import connectToDB from "@utils/database";
import Hall from "@models/hall";

export const GET = async (req,{params}) => {
  try {
    await connectToDB();
    const res = await Hall.findOne({_id:params.id});
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response({ msg: error }, { status: 500 });
  }
};
