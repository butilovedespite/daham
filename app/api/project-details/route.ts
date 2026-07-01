import { NextRequest, NextResponse } from "next/server";
import { getDetailImagePaths } from "@/lib/projectDetails.server";

export async function GET(request: NextRequest) {
  const imagePath = request.nextUrl.searchParams.get("image");

  if (!imagePath) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  return NextResponse.json({ images: getDetailImagePaths(imagePath) });
}
