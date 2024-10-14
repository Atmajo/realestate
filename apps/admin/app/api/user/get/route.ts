import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await prisma.user.findMany();
    return NextResponse.json({
      message: "User added successfully",
      users: user,
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
