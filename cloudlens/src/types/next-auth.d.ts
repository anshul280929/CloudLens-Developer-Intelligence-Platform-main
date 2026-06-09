import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    /** GitHub OAuth access token — available in Server Components via `auth()` */
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    providerAccountId?: string;
  }
}
