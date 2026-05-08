import { ApiServerResponse } from "@/features/api/types";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

type UrlParams = Promise<{ userId: string }>;

export async function PATCH(
  req: NextRequest,
  { params }: { params: UrlParams },
): Promise<NextResponse<ApiServerResponse<null>>> {
  try {
    const { userId } = await params;
    const { name, email } = await req.json();

    if (!name || !email) {
      throw new ApiError(400, "Missing required fields");
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });

    return NextResponse.json({
      msg: "Successfully updated user",
      data: null,
    });
  } catch (err: any) {
    const status = err instanceof ApiError ? err.status : 500;
    return NextResponse.json(
      {
        msg: err.message,
        data: null,
      },
      { status },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: UrlParams },
): Promise<NextResponse<ApiServerResponse<null>>> {
  try {
    const { userId } = await params;

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      msg: "Successfully deleted user",
      data: null,
    });
  } catch (err: any) {
    const status = err instanceof ApiError ? err.status : 500;
    return NextResponse.json(
      {
        msg: err.message,
        data: null,
      },
      { status },
    );
  }
}
