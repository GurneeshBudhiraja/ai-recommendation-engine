import connectDB from "@/lib/db";
import API from "@/model/api.model";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams
  const apiKeyID = queryParams.get("key")

  // Checks for the apiKeyID query parameter
  if (!apiKeyID?.trim()) {
    return NextResponse.json({
      success: false,
      message: "Invalid API Key ID"
    }, { status: 400 })
  }

  try {
    await connectDB();
    const deleteResponse = await API.findOneAndUpdate(
      { "keys._id": apiKeyID },
      { $pull: { keys: { "_id": apiKeyID } } },
      { new: true }
    )

    // Checks for the empty array 
    if (deleteResponse?.keys.length === 0) {
      await API.deleteOne({ _id: deleteResponse._id });
      return NextResponse.json({
        success: true,
        message: "Key deleted and document removed as keys array is empty",
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      message: "API key deleted successfully",
      data: deleteResponse || []
    })
  } catch (error) {
    console.log("Error while deleting API key:", error)
    return NextResponse.json({
      success: false,
      message: "Error deleting API key"
    }, { status: 500 })
  }

}