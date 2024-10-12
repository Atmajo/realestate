import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json();
  
  const JWT_SECRET = process.env.JWT_SECRET!;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    
    if (user) {
      const res = await bcrypt.compare(body.password, user.password);

      if (!res) {
        return NextResponse.json({
          message: "Invalid credentials",
          success: false,
        });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return NextResponse.json({
        message: "User signed in",
        token: token,
        user: user,
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "User not signed in",
      error,
      success: false,
    });
  }
}
