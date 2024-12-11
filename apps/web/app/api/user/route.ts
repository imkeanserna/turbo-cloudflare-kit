import { prisma } from "@repo/database";

export async function GET() {
  try {
    console.log("Sdasdad")
    const users = await prisma.user.findMany({ where: {}, cacheStrategy: { ttl: 60 }, });
    console.log(users);
    return new Response(JSON.stringify(users));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
