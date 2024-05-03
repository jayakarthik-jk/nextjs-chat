import 'server-only'

import Google from 'next-auth/providers/google'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from './db'

declare module 'next-auth' {
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
  adapter: PrismaAdapter(db) as NextAuthConfig['adapter'],
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...user,
          id: user.id
        }
      }
    }
  }
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth
} = NextAuth(authConfig)
