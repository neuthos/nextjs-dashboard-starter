/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

// import type { SessionInterface } from '@/types/auth/SessionInsterface';
import type { Session } from 'next-auth';
import NextAuth from 'next-auth';
import { signIn } from 'next-auth/react';
import { custom, Issuer } from 'openid-client';

const oidcIssuer = process.env.OIDC_ISSUER ?? '';
const oidcClientId = process.env.OIDC_CLIENT_ID ?? '';
const oidcClientSecret = process.env.OIDC_CLIENT_SECRET ?? '';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
function calculateExpireAtMilliseconds(expireAtSeconds: number | undefined) {
  if (!expireAtSeconds) {
    return Date.now() + 15 * 60 * 1000;
  }

  return expireAtSeconds * 1000;
}

function hasNotExpired(expireAtSeconds: unknown) {
  if (typeof expireAtSeconds !== 'number') {
    return false;
  }

  if (!expireAtSeconds) {
    return false;
  }

  return Date.now() < expireAtSeconds;
}

async function refreshAccessToken(token: any) {
  try {
    if (!token.refreshToken) {
      signIn('oidc');
      throw new Error('Refresh token is empty!');
    }

    const discovery = await Issuer.discover(oidcIssuer);

    const client = new discovery.Client({
      client_id: oidcClientId,
      client_secret: oidcClientSecret,
      // token_endpoint_auth_method: 'none',
    });

    client[custom.clock_tolerance] = 10; // to allow a 10 second skew

    console.log('NextAuth refreshing token: ', token.refreshToken);
    const update = await client.refresh(token.refreshToken);

    return {
      ...token,
      accessToken: update.access_token,
      accessTokenExpires: calculateExpireAtMilliseconds(update.expires_at),
      refreshToken: update.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (err) {
    signIn('oidc');
    console.log('NextAuth error when refreshing token: ', err);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  providers: [
    {
      id: 'oidc',
      name: 'Sics Login',
      type: 'oauth',
      wellKnown: `${oidcIssuer}/.well-known/openid-configuration`,
      clientId: oidcClientId,
      clientSecret: oidcClientSecret,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
      checks: ['pkce', 'state'],
      idToken: true,
      userinfo: {
        async request(context: any) {
          if (context.tokens.access_token) {
            const data = await context.client.userinfo(
              context.tokens.access_token
            );
            return data;
          }
          return {};
        },
      },
      profile(profile: any) {
        const allowedRoles: any = {};
        if (profile.resource_access?.irsx_productdigital) {
          profile.resource_access?.irsx_productdigital.roles.forEach(
            (role: any) => {
              allowedRoles[role] = true;
            }
          );
        }

        return {
          id: profile.sub,
          name: profile.name,
          given_name: profile.given_name,
          preferred_username: profile.preferred_username,
          email: profile.email,
          resource_access: Object.keys(profile.resource_access),
          roles: allowedRoles,
          koperasi_guid: profile.koperasi_guid,
          phone_number: profile.phone_number,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: calculateExpireAtMilliseconds(account.expires_at),
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (hasNotExpired(token.accessTokenExpires)) {
        return token;
      }

      console.log('Token has expired');
      return refreshAccessToken(token);
    },
    async session({ token, session }: any): Promise<Session> {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
