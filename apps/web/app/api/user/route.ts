import { prisma } from "@/db";

export const runtime = "edge";

export async function GET() {
  try {
    const users = await prisma.user.findMany({ where: {}, cacheStrategy: { ttl: 60 }, });
    return new Response(JSON.stringify(users));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
