"use server";
import { getServerSession } from "next-auth";
import connectToDB from "@utils/database";
import User from "@models/user";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function updateUserRole() {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session) {
      await User.findByIdAndUpdate(
        { _id: session?.user._id },
        { role: "host" }
      );
      return { msg: "success" };
    } else {
      return { msg: "error" };
    }
  } catch (error) {
    return { msg: "error" };
  }
}
export async function updateUser(Name, Email, Link) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (session) {
      await User.findByIdAndUpdate(
        { _id: session?.user._id },
        { image: Link, name: Name, email: Email }
      );
      return { msg: "success" };
    } else {
      return { msg: "error" };
    }
  } catch (error) {
    return { msg: "error" };
  }
}

export async function updateUserBooking(bookingObj) {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      await User.findByIdAndUpdate(
        { _id: session?.user._id },
        { $push: { booked: bookingObj } }
      );
      return { msg: "success" };
    } else {
      return { msg: "error" };
    }
  } catch (error) {
    return { msg: "error" };
  }
}
