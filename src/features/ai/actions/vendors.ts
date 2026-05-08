import { prisma } from "@/lib/prisma";
import { maskKey } from "@/utils";
import { AiVendorMapped } from "../types";

export async function getUserAiVendorsRaw(userId: string) {
  return await prisma.userAiVendors.findMany({
    where: { userId },
  });
}

export async function getUserAiVendorsMapped(
  userId: string,
): Promise<AiVendorMapped[]> {
  const vendors = await getUserAiVendorsRaw(userId);

  return vendors
    .map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      key: maskKey(vendor.key),
      lastUsed: vendor.lastUsed,
      lastUsedModel: vendor.lastUsedModel,
    }))
    .sort((a, b) => {
      return a.lastUsed > b.lastUsed ? -1 : 1;
    });
}
