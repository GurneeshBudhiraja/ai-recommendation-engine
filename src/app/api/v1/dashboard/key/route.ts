

import connectDB from "@/lib/db";
import API from "@/model/api.model";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const queryParams = (request.nextUrl.searchParams)
  const userid = queryParams.get("userid");
  if (!userid) {
    return NextResponse.json({
      success: false,
      message: "Please provide a valid userid"
    }, { status: 400 })
  }

  try {
    await connectDB();
    const findOneResponse = await API.findOne({ userid: userid })

    return NextResponse.json({
      success: true,
      message: "dashboard route",
      data: findOneResponse?.keys || []
    }, { status: 200 })
  } catch (error) {
    console.log("error in dashboard/key", error)
    return NextResponse.json({
      success: false,
      message: "Error fetching keys"
    }, { status: 500 })
  }
}