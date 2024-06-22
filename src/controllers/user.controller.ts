import { Request, Response } from "express";
import { getTokenFromRequestHeaders, getUserFromToken } from "@/utils";
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

class UserController {
  constructor() {}

  async register(req: Request, res: Response) {
    try {
      const { name, email, age, gender, address, password } = req.body;
      await db.insert(users).values({
        name,
        email,
        age,
        gender,
        address,
        password,
      });
      res.status(200).json({
        message: "User created successfully",
      });
    } catch (error: any) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user: User[] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      /* Check if user exists on database */
      if (user.length <= 0) {
        return res.status(404).json({
          message: "User not found",
          jwt_token: null,
        });
      }

      /* Check if password match */
      if (user[0].password !== password) {
        return res.status(401).json({
          message: "Incorrect password",
          jwt_token: null,
        });
      }
      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
      });

      res.status(200).json({
        message: "Login successful",
        jwt_token: token,
      });
    } catch (error: any) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  async getSession(req: Request, res: Response) {
    const token: string | null = getTokenFromRequestHeaders(req);
    const user: User | null = await getUserFromToken(token);
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(401).json({
        message: "Unauthorized access, please check Authorization token",
      });
    }
  }
}

export default new UserController();
