import API from "@/model/api.model";
import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const apiName = formData.get('name') as string;
    const userID = formData.get('userid') as string;

    // Checks for the missing fields
    if (!apiName?.trim() || !userID?.trim()) {
      return NextResponse.json({
        success: false,
        message: "Please provide both name and userID."
      }, { status: 400 })
    }

    // checks db connection
    await connectDB()



    const findDocResponse = await API.findOne({ userid: userID })
    if (findDocResponse?.keys?.length === 3) {
      return NextResponse.json({
        success: false,
        message: "You have reached the maximum limit of API keys."
      }, { status: 400 })
    }

    // check if the document exists on the basis of userID
    const documentUpsertResponse = await API.findOneAndUpdate(
      { userid: userID },
      {
        $push: {
          keys: {
            $each: [{
              name: apiName
            }],
            $position: 0
          }

        }
      },
      { new: true, upsert: true }
    )
    console.log(documentUpsertResponse);
    return NextResponse.json({
      success: true,
      message: "API key generated successfully",
    }, { status: 200 })
  } catch (err) {
    console.log(err)

    return NextResponse.json({
      success: false,
      message: "Failed to generate unique key"
    }, { status: 500 })
  }
}