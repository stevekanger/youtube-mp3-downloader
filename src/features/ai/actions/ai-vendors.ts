import { prisma } from "@/lib/prisma";
import { maskKey } from "@/utils";

export async function getUserAiVendorsCount(userId: string) {
  return await prisma.userAiVendors.count({
    where: { userId },
  });
}

export async function getUserAiVendors(userId: string) {
  return await prisma.userAiVendors.findMany({
    where: { userId },
  });
}

export async function getUserAiVendorsMapped(userId: string) {
  const vendors = await getUserAiVendors(userId);

  return vendors.map((vendor) => ({
    id: vendor.id,
    name: vendor.name,
    key: maskKey(vendor.key),
    active: vendor.active,
    model: vendor.model,
  }));
}
