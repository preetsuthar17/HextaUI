import { relations, sql } from "drizzle-orm"
import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core"

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  image: text("image"),
  unsubscribedAt: integer("unsubscribed_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull(),
})

export const session = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
)

export const account = sqliteTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
      mode: "timestamp_ms",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
)

export const verification = sqliteTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  purchases: many(purchase),
  apiTokens: many(apiToken),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const purchase = sqliteTable(
  "purchase",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    productId: text("product_id").notNull(),
    plan: text("plan", { enum: ["solo", "team", "unlimited"] })
      .default("solo")
      .notNull(),
    customerId: text("customer_id").notNull(),
    status: text("status", {
      enum: ["paid", "refunded", "disputed"],
    }).notNull(),
    amount: integer("amount").notNull(),
    currency: text("currency").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("purchase_userId_idx").on(table.userId)]
)

export const purchaseRelations = relations(purchase, ({ one, many }) => ({
  user: one(user, {
    fields: [purchase.userId],
    references: [user.id],
  }),
  members: many(teamMember),
}))

export const teamMember = sqliteTable(
  "team_member",
  {
    id: text("id").primaryKey(),
    purchaseId: text("purchase_id")
      .notNull()
      .references(() => purchase.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("team_member_purchase_email_idx").on(
      table.purchaseId,
      table.email
    ),
    index("team_member_email_idx").on(table.email),
  ]
)

export const teamMemberRelations = relations(teamMember, ({ one }) => ({
  purchase: one(purchase, {
    fields: [teamMember.purchaseId],
    references: [purchase.id],
  }),
}))

export const apiToken = sqliteTable(
  "api_token",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    hint: text("hint").notNull(),
    hash: text("hash").notNull().unique(),
    lastUsedAt: integer("last_used_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
  },
  (table) => [index("api_token_userId_idx").on(table.userId)]
)

export const apiTokenRelations = relations(apiToken, ({ one }) => ({
  user: one(user, {
    fields: [apiToken.userId],
    references: [user.id],
  }),
}))

export const emailSend = sqliteTable(
  "email_send",
  {
    id: text("id").primaryKey(),
    campaign: text("campaign").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    sentAt: integer("sent_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("email_send_campaign_user_idx").on(
      table.campaign,
      table.userId
    ),
  ]
)

export const subscriber = sqliteTable("subscriber", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source"),
  lastCampaign: text("last_campaign"),
  unsubscribedAt: integer("unsubscribed_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
})

export const sponsor = sqliteTable(
  "sponsor",
  {
    id: text("id").primaryKey(),
    status: text("status", {
      enum: [
        "pending",
        "active",
        "on_hold",
        "paused",
        "cancelled",
        "failed",
        "expired",
        "past_due",
      ],
    })
      .default("pending")
      .notNull(),
    name: text("name").notNull(),
    headline: text("headline").notNull(),
    description: text("description").notNull(),
    cta: text("cta").notNull(),
    url: text("url").notNull(),
    email: text("email").notNull(),
    subscriptionId: text("subscription_id").unique(),
    customerId: text("customer_id"),
    activatedAt: integer("activated_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("sponsor_status_idx").on(table.status)]
)
