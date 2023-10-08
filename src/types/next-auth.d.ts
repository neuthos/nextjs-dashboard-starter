/* eslint-disable unused-imports/no-unused-imports */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import NextAuth from 'next-auth';

interface User {
  id: string;
  given_name: string;
  preferred_username: string;
  email: string;
  resource_access: any[];
  roles: any;
  koperasi_guid: string;
  branch_guid: string;
  branch_detail: any;
  phone_number: string;
  roleName?: string;
}

declare module 'next-auth' {
  interface Session {
    user: User;
    expires: string;
    accessToken: string;
    error?: any;
    id_token?: string;
  }
}
