import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  foreignKey,
  pgEnum,
} from "drizzle-orm/pg-core";

const codeLang = pgEnum("code_language", ["py", "cpp", "ts", "js"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// ===================
// Topics Table
// ===================
export const topics = pgTable(
  "topics",
  {
    id: serial("id").primaryKey(),

    title: text("title").notNull(),
    description: text("description"),
    content: text("content"),

    parentId: integer("parent_id"),

    order: integer("order").default(0),
    slug: text("slug"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    foreignKey({
      name: "parent_fk",
      columns: [table.parentId],
      foreignColumns: [table.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ]
);

export type Topic = typeof topics.$inferSelect;

export const topicsRelations = relations(topics, ({ one, many }) => ({
  parent: one(topics, {
    fields: [topics.parentId],
    references: [topics.id],
  }),
  children: many(topics),
}));

// ===================
// Templates
// ===================
export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),

  topicId: integer("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ===================
// Examples
// ===================
export const examples = pgTable("examples", {
  id: serial("id").primaryKey(),

  topicId: integer("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  code: text("code"),
  language: codeLang("language").notNull().default("py"),
  output: text("output"),
  explanation: text("explanation"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Example = typeof examples.$inferSelect;

// ===================
// Problems
// ===================
export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),

  topicId: integer("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  url: text("url"),
  source: text("source"),
  difficulty: text("difficulty"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Problem = typeof problems.$inferSelect;

// ===================
// Cheats
// ===================
export const cheats = pgTable("cheats", {
  id: serial("id").primaryKey(),

  topicId: integer("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),

  note: text("note").notNull(),
  type: text("type"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ===================
// Resources
// ===================
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),

  topicId: integer("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  url: text("url").notNull(),
  type: text("type"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Resource = typeof resources.$inferSelect;

const schema = {
  codeLang,
  user,
  session,
  account,
  verification,
  topics,
  templates,
  examples,
  problems,
  cheats,
  resources,
};

export default schema;
