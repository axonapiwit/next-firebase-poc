// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    address: string;
  }

  interface Session {
    user: User & {
      accessToken: string;
      address: string;
    };
  }

  interface JWT {
    accessToken: string;
    address: string;
  }
}
