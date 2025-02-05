import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '~/server/models/user'
import bcrypt from 'bcrypt'
import { H3Error } from 'h3';

declare module 'next-auth' {
  interface User {
    coins?: number;
    bonus?: number;
  }
  interface Session {
    user: {
      id?: string;
      coins?: number;
      bonus?: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

const config = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: config.auth.secret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required')
          }

          const user = await User.findOne({ email: credentials.email })
            .select('email password coins bonus')
            .lean()
            .exec()

          if (!user) {
            throw new Error('Email not found')
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            throw new Error('Invalid password')
          }

          return {
            id: user._id.toString(),
            email: user.email,
            coins: user.coins,
            bonus: user.bonus
          }
        }
        catch (error) {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.coins = user.coins
        token.bonus = user.bonus

        // Fetch user from DB and include coins & bonus
        const dbUser = await User.findById(user.id);
        if (dbUser) {
          token.coins = dbUser.coins;
          token.bonus = dbUser.bonus;
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.coins = token.coins as number
        session.user.bonus = token.bonus as number
      }
      return session
    }
  },
})
