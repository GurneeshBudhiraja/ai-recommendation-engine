import connectDB from "@/lib/db";
import DbImage from "@/model/image.model";
import { type NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line 
export type Query = Record<string, any>;

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const queryParams = request.nextUrl.searchParams
    const cursor = queryParams.get("cursor") || ""
    const furnitureType = queryParams.get("type") || ""
    const limit = Number(queryParams.get("limit")) || 5

    const query: Query = { furnitureType }
    if (cursor) {
      query._id = { $gt: cursor }
    }

    const dbImageResponse = await DbImage.find(query).limit(limit)
    const prevCursor = cursor && dbImageResponse.length > 0 ? dbImageResponse[0]._id : ""
    const nextCursor = dbImageResponse.length > 0 ? dbImageResponse[dbImageResponse.length - 1]._id : ""
    return NextResponse.json({
      success: true,
      prevCursor,
      nextCursor,
      data: dbImageResponse

    }, { status: 200, })

  } catch (error) {
    console.log("Error in items route:", error)
    return NextResponse.json({
      success: false,
      message: "Error in getting items",
      data: []
    }, { status: 500 })
  }
}