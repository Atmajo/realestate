import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const properties = await prisma.property.findMany();
    return NextResponse.json({
      properties: properties,
    });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json({
      message: "Properties not found",
      error: error,
      success: false,
    });
  }
}
