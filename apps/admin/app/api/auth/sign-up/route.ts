import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const hashed = await bcrypt.hash(body.password, 10);
  const data = {
    ...body,
    password: hashed,
  };
  
  try {
    const user = await prisma.user.create({
      data,
    });
    return NextResponse.json({
      message: "User created",
      user: user,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "User not created",
      error,
      success: false,
    });
  }
}
