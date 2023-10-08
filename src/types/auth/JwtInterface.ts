interface User {
  id: string;
  name?: string;
  given_name: string;
  preferred_username: string;
  email: string;
  resource_access: string[];
  roles: {
    [key: string]: boolean;
  };
  koperasi_guid: string;
  phone_number: string;
  branch_guid: string;
}

interface Token {
  name?: string;
  email: string;
  picture?: string;
  sub: string;
  accessTokenExpires?: number;
}

interface Account {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  expires_at: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

export interface JwtDataPayload {
  token: Token;
  account: Account;
  user: User;
}
