import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core'
import type { Account } from 'next-auth'

export const users = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image')
})

export type User = typeof users.$inferSelect

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<Account['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
)

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
})

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
  },
  vt => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
)

export const userRelations = relations(users, ({ many }) => ({
  posts: many(chats)
}))

export const chats = sqliteTable('chat', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('userId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
})

export const chatRelations = relations(chats, ({ many }) => ({
  messages: many(messages)
}))

export const messages = sqliteTable('message', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  chatId: text('chatId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  response: text('response').notNull()
})

export type Message = typeof messages.$inferSelect
