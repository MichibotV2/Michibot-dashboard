import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ['identify'].join(' ')
const uri = `${process.env.NEXTAUTH_URL}api/auth/callback/discord`;

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: scopes, redirect_uri: uri } },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      // Add Discord user ID to the session object
      session.user.id = token.sub; // The `sub` property contains the Discord user ID
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.sub = account.providerAccountId; // Save Discord user ID in the token
      }
      return token;
    },
  },
})
