import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyMessage } from "ethers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Ronin Wallet',
      credentials: {
        address: { label: 'Wallet Address', type: 'text', placeholder: '0x...' },
        signature: { label: 'Signature', type: 'text', placeholder: 'Signature' },
      },
      async authorize(credentials) {
        const { address, signature } = credentials as {
          address: string;
          signature: string;
        };

        const message = `Login to MyApp`;
        console.log(address, signature, message);

        try {
          // Verify the signature
          const signerAddress = verifyMessage(message, signature);
          if (signerAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error('Invalid signature');
          }

          // Return user object
          return { id: address, address };
        } catch (error) {
          console.error('Authorization failed:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("JWT Callback account: ", user);
      if (account && account.id_token) {
        try {
          token.accessToken = account.id_token;
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
      if (user) {
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback: ", token);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
        session.user.address = token.address as string;
      }
      
      return session;
    },
  },
  debug: true,
};

export default NextAuth(authOptions);
