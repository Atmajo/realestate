import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const booking = await prisma.booking.findMany();

    return NextResponse.json({
      message: "Booking added successfully",
      bookings: booking,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while fetching booking",
      status: 500,
    });
  }
}
