import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    await prisma.property.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Property deleted",
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Property not deleted",
      error: err,
      success: false,
    });
  }
}
