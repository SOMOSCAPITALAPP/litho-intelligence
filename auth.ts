import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyNeonCredentials } from "@/lib/neon-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");

        if (!email.includes("@") || password.length < 6) return null;

        const user = await verifyNeonCredentials(email, password);
        if (!user) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.full_name ?? user.email,
          plan: user.plan
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as { plan?: string }).plan ?? "free";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; plan?: string }).id = typeof token.id === "string" ? token.id : undefined;
        (session.user as { id?: string; plan?: string }).plan = typeof token.plan === "string" ? token.plan : "free";
      }
      return session;
    }
  }
});
