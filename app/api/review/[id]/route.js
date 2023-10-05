"use server";
import connectToDB from "@utils/database";
import Review from "@models/review";

export const GET = async (req, {params}) => {
  try {
    await connectToDB();
    const review = await Review.find({ HallId: params.id});
    return new Response(JSON.stringify(review), { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
