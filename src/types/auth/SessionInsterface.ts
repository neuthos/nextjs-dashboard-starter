interface User {
  id: string;
  given_name: string;
  preferred_username: string;
  email: string;
  resource_access: any[];
  roles: any;
  koperasi_guid: string;
  phone_number: string;
  branch_guid: string;
  branch_detail: any;
}

interface Token {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  user: User;
  iat: number;
  exp: number;
  jti: string;
  error?: any;
}

interface Session {
  user: User;
  expires: string;
  accessToken: string;
  error?: any;
}

export interface SessionInterface {
  token: Token;
  session: Session;
}
