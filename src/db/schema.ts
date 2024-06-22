import {
  uuid,
  text,
  pgTable,
  timestamp,
  numeric,
  integer,
} from "drizzle-orm/pg-core";

export const products = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom().unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom().unique().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender", { enum: ["male", "female"] }).notNull(),
  address: text("address").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});
