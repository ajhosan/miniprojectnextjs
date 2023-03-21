import { generateToken } from "@/src/lib/generateToken";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import moment from "moment/moment";
// import { middleware } from "@/middleware";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'my-projects',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials, req) {
                let data = {
                    error: false,
                    data: {
                        id: 1,
                        email: 'google@google.com',
                        avatars: 'http://domain.com/url-images'
                    }
                }

                const token = await generateToken(data?.data, '1d');

                Reflect.set(
                    data, 'token', token
                )

                // call service
                return {
                    ...data
                }

            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        maxAge: 12000,
        secret: process.env.NEXTAUTH_SECRET
    },
    session: {
        maxAge: 12000,
        strategy: 'jwt'
    },
    pages: {
        signIn: '/'
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async signIn({
            account, profile, user, credentials
        }) {
            switch (account?.provider) {
                case "credentials":
                    return user?.error === false;
                // break;
                default:
                    return false;
            }
        },
        async jwt({
            token,
            user,
            profile,
            account
        }) {
            user && (
                token.user = {
                    ...user,
                    bearer_token: token?.user?.token ?? null,
                    id: token?.user?.data?.id ?? null,
                    email: token.user?.data?.email ?? null
                }
            );

            user && (
                token.accessToken = user?.token
            );

            profile && (token.profile = profile)

            account && (token.account = account)

            return {
                ...token,
            }
        },

        async session({ session, token, user, profile }) {

            if (Date.now() > moment(session?.expires)) {
                return null;
            }

            session.user = token?.user
            session.profile = token?.profile ?? null
            session.account = token?.account ?? null
            session.data = token ?? null

            // Reflect.set(session, 'data', token ?? null)

            return session;
        }
    },
    debug: true
})