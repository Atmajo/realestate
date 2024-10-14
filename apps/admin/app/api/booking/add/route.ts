import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const booking = await prisma.booking.create({
      data: data,
    });

    return NextResponse.json({
      message: "Booking added successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while adding booking",
      status: 500,
    });
  }
}
