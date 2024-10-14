import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id } = await req.json();

    const user = await prisma.user.delete({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "User deleted successfully",
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
