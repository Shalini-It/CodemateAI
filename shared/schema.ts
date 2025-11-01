import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tip generation schemas
export const tipRequestSchema = z.object({
  language: z.string().min(1, "Language is required"),
  topic: z.string().min(1, "Topic is required"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
});

export type TipRequest = z.infer<typeof tipRequestSchema>;

export const tipResponseSchema = z.object({
  title: z.string(),
  code: z.string(),
  explanation: z.string(),
  language: z.string(),
  topic: z.string(),
  difficulty: z.string(),
  readingTime: z.string(),
});

export type TipResponse = z.infer<typeof tipResponseSchema>;
