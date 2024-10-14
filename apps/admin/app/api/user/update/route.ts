import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, ...data } = await req.json();

    const user = await prisma.user.update({
      where: { id: id },
      data: data,
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: user,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while updating user",
      status: 500,
    });
  }
}
