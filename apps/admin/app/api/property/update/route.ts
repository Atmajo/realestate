import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const property = await prisma.property.update({
      where: {
        id: body.id,
      },
      data: {
        ...body,
      },
    });
    
    return NextResponse.json({
      message: "Property updated",
      property: property,
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Property not updated",
      error: err,
      success: false,
    });
  }
}
