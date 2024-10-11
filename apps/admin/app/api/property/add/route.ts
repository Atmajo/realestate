import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const data = {
    ...body,
    possession: format(body.possession, "yyyy-MM-dd"),
  };

  try {
    const property = await prisma.property.create({
      data,
    });
    return NextResponse.json({
      message: "Property created",
      property: property,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Property not created",
      error,
      success: false,
    });
  }
}
