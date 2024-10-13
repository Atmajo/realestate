import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Property found",
      property: property,
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Property not found",
      status: 404,
    });
  }
}
