import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("user", {
  id: uuid("user").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  clerk_id: text("clerk_id").unique().notNull(),
  email: text("email").unique().notNull(),
});

export const notes = pgTable("notes", {
  id: uuid("user").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  user_id: text("user_id")
    .references(() => users.clerk_id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const noteRelations = relations(notes, ({ one }) => ({
  user: one(users, { fields: [notes.user_id], references: [users.clerk_id] }),
}));

// API
export const insertNoteSchema = createInsertSchema(notes);
