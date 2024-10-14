import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "User fetched successfully",
      user: user,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while fetching user",
      status: 500,
    });
  }
}
