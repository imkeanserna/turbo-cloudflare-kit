import dotenv from "dotenv";
import { getPrisma } from "./client";

dotenv.config();

const prisma = getPrisma({ DATABASE_URL: process.env.DATABASE_URL! });

import type { User } from "@prisma/client";

const DEFAULT_USERS = [
  {
    name: "Kean 3",
    email: "kean3@apple.com",
  },
] as Array<Partial<User>>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
          cacheStrategy: { swr: 60, ttl: 60 }
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
