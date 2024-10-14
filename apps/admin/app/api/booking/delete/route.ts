import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const booking = await prisma.booking.delete({
      where: { id: id },
    });

    return NextResponse.json({
      message: "Booking deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while deleting booking",
      status: 500,
    });
  }
}
