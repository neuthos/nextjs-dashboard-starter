import { getSession } from 'next-auth/react';
import { Issuer } from 'openid-client';

const oidcIssuer = process.env.OIDC_ISSUER;

export default async function endSession(_req: any, res: any) {
  const discovery = await Issuer.discover(oidcIssuer ?? '');
  const session = await getSession({ req: _req });

  let path = `${
    discovery.metadata.end_session_endpoint
  }?post_logout_redirect_uri=${encodeURIComponent(
    process.env.NEXTAUTH_URL ?? ''
  )}`;

  if (session?.id_token) {
    path += `&id_token_hint=${session.id_token}`;
  } else {
    path += `&client_id=${process.env.OIDC_CLIENT_ID}`;
  }

  res.redirect(302, path ?? '/');
}
