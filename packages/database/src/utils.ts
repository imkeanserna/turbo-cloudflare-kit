import dotenv from "dotenv";
import { getPrisma } from "./client";

dotenv.config();

const prisma = getPrisma({ DATABASE_URL: process.env.DATABASE_URL! });

interface IAddUser {
  email: string;
  name?: string;
  password?: string;
  image?: string;
}

type IUpdateUser = IAddUser;

export const getUserByEmail = async (email: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email },
    });
    return result ?? null;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw new Error("Unable to fetch user by email");
  }
};

export const addUser = async ({
  email,
  name,
  password,
  image
}: IAddUser) => {
  try {
    const isUserExist = await getUserByEmail(email);

    if (isUserExist) {
      throw new Error("Email already registered");
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split("@")[0],
        password: password || null,
        image,
      },
    });

    return {
      email: user.email,
      name: user.name,
    };
  } catch (error: any) {
    console.error("Error in addUser:", error);
    throw new Error(error.message || "Failed to add user.");
  }
};

export const updateUser = async ({ email, name, password, image }: IUpdateUser) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new Error("User not found.");
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        ...(name && { name }),
        ...(password && { password }),
        ...(image && { image })
      },
    });

    return {
      email: updatedUser.email,
      name: updatedUser.name,
    };
  } catch (error: any) {
    console.error("Error in updateUser:", error);
    throw new Error(error.message || "Failed to update user.");
  }
};

export const getUserById = async (id: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
    });
    return result ?? null;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw new Error("Unable to fetch user by id");
  }
};
