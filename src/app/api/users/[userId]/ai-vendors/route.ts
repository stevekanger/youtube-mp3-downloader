import { ApiDataAiVendors, ApiServerResponse } from "@/features/api/types";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import {
  getUserAiVendorsMapped,
  getUserAiVendorsCount,
} from "@/features/ai/actions/ai-vendors";
import { getVendorModels } from "@/features/ai/services/vendors";

type UrlParams = Promise<{ userId: string }>;

export async function GET(
  req: NextRequest,
  { params }: { params: UrlParams },
): Promise<NextResponse<ApiServerResponse<ApiDataAiVendors>>> {
  try {
    const { userId } = await params;

    const vendors = await getUserAiVendorsMapped(userId);
    return NextResponse.json({
      msg: "Successfully retrieved users ai providers",
      data: vendors,
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

export async function POST(
  req: NextRequest,
  { params }: { params: UrlParams },
): Promise<NextResponse<ApiServerResponse<ApiDataAiVendors>>> {
  try {
    const { userId } = await params;
    const { name, key } = await req.json();

    if (!name || !key) {
      throw new ApiError(400, "Missing required fields.");
    }

    const models = getVendorModels(name);

    if (!models) {
      throw new ApiError(400, `Invalid vendor name ${name}`);
    }

    const hasAiVendors = await getUserAiVendorsCount(userId);
    await prisma.userAiVendors.create({
      data: {
        userId,
        name,
        key,
        active: hasAiVendors ? false : true,
        model: models.default,
      },
    });

    const vendors = await getUserAiVendorsMapped(userId);
    return NextResponse.json({
      msg: "Successfully added ai provider",
      data: vendors,
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: UrlParams },
): Promise<NextResponse<ApiServerResponse<ApiDataAiVendors>>> {
  try {
    const { userId } = await params;
    const { id, data } = await req.json();

    if (!id || !data) {
      throw new ApiError(400, "Missing required fields.");
    }

    await prisma.userAiVendors.update({
      where: { id },
      data,
    });

    const vendors = await getUserAiVendorsMapped(userId);
    return NextResponse.json({
      msg: "Successfully added ai provider",
      data: vendors,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: UrlParams },
): Promise<NextResponse<ApiServerResponse<ApiDataAiVendors>>> {
  try {
    const { userId } = await params;
    const { id } = await req.json();

    if (!id) {
      throw new ApiError(400, "Missing required fields.");
    }

    await prisma.userAiVendors.delete({
      where: { id },
    });

    const vendors = await getUserAiVendorsMapped(userId);
    return NextResponse.json({
      msg: "Successfully added ai provider",
      data: vendors,
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
