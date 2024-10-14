import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, ...data } = await req.json();

  try {
    const booking = await prisma.booking.update({
      where: { id: id },
      data: data,
    });

    return NextResponse.json({
      message: "Booking updated successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while updating booking",
      status: 500,
    });
  }
}
