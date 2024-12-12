import { getPrisma } from "@repo/database";

export const prisma = getPrisma({
  DATABASE_URL: process.env.DATABASE_URL!
});
