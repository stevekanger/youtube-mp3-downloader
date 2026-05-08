import { AI_VENDOR_GOOGLE } from "@/constants";
import { googleFetch } from "@/features/ai/services/vendors";
import {
  ApiDataGenrateFileData,
  ApiServerResponse,
} from "@/features/api/types";
import { prisma } from "@/lib/prisma";
import ApiError from "@/utils/ApiError";
import { NextRequest, NextResponse } from "next/server";

type UrlParams = Promise<{ userId: string }>;

export async function POST(
  req: NextRequest,
  { params }: { params: UrlParams },
): Promise<NextResponse<ApiServerResponse<ApiDataGenrateFileData>>> {
  try {
    const { userId } = await params;
    const { videoTitle, vendor, model } = await req.json();

    let data: ApiDataGenrateFileData | null = null;

    const vendorRow = await prisma.userAiVendors.findFirst({
      where: { name: vendor, userId },
    });

    if (!vendorRow) {
      throw new ApiError(400, "No ai vendor found.");
    }

    if (vendor === AI_VENDOR_GOOGLE) {
      data = await googleFetch(vendorRow.key, model, videoTitle);
    } else {
      throw new ApiError(400, `Unknown ai vendor ${vendor}`);
    }

    return NextResponse.json({
      msg: "Successfully retreived data",
      data: data,
    });
  } catch (err: any) {
    const status = err instanceof ApiError ? err.status : 500;
    return NextResponse.json(
      {
        msg: err.msg,
        data: null,
      },
      { status },
    );
  }
}
