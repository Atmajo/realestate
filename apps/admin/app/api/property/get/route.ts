import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const properties = await prisma.property.findMany();
    return NextResponse.json({
      properties: properties,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Properties not found",
      error,
      success: false,
    });
  }
}
