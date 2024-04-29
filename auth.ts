import Google from 'next-auth/providers/google'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from './database/db'

declare module 'next-auth' {
  // @ts-ignore
  interface Session {
    user: {
      id: string
      email: string
      name: string
    }
  }
}

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/login'
  },
  adapter: DrizzleAdapter(db) as NextAuthConfig['adapter'],
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ]
} satisfies NextAuthConfig

export const { auth, signIn, signOut } = NextAuth(authConfig)
