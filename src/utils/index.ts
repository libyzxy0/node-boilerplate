import { Request } from "express";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  address: string;
  gender: "male" | "female";
  created_at: string;
};

export const getTokenFromRequestHeaders = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(" ");
  if (token[0] !== "Bearer" || token.length !== 2) return authHeader;
  return token[1];
};

export const getUserFromToken = async (token: string): Promise<User | null> => {
  try {
    if (!token) return null;
    const jwt_user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user: User[] = await db
      .select()
      .from(users)
      .where(eq(users.id, jwt_user.id));
    if (!user[0]) return null;
    return user[0];
  } catch (error: unknown) {
    console.log("Failed to get user");
    return null;
  }
};
