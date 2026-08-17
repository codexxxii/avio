import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// User
export const users = pgTable("user", {
  id: uuid("user").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  clerk_id: text("clerk_id").unique().notNull(),
  email: text("email").unique().notNull(),
});

// Notes
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

// Recipes
export const recipes = pgTable("recipes", {
  id: uuid("user").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  user_id: text("user_id")
    .references(() => users.clerk_id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  image_url: text("image_url"),
  servings: text("servings").notNull(),
  prep_time: text("prep_time").notNull(),
  cook_time: text("cook_time").notNull(),
  category: text("category").notNull(),
  ingredients: text("ingredients").array().notNull(),
  instructions: text("instructions").array().notNull(),
});

// Relations
export const userRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const noteRelations = relations(notes, ({ one }) => ({
  user: one(users, { fields: [notes.user_id], references: [users.clerk_id] }),
}));

export const recipeRelations = relations(recipes, ({ one }) => ({
  user: one(users, { fields: [recipes.user_id], references: [users.clerk_id] }),
}));

// API
export const insertNoteSchema = createInsertSchema(notes);
export const insertRecipeSchema = createInsertSchema(recipes);
