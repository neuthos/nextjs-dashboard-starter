import React, { useContext } from 'react';

export interface UserInfo {
  id: string;
  given_name: string;
  preferred_username: string;
  email: string;
  resource_access: any[];
  roles: any;
  koperasi_guid: string;
  branch_guid: string;
  branch_detail: any;

  phone_number?: string;
  roleName?: string;
}

export interface AuthorizationContextData {
  accessToken: string;
  user: UserInfo;
  isAuthenticated: boolean;
}

export const AuthorizationContext =
  React.createContext<AuthorizationContextData>({
    accessToken: '',
    user: {
      id: '',
      given_name: '',
      preferred_username: '',
      email: '',
      resource_access: [],
      roles: {},
      koperasi_guid: '',
      phone_number: '',
      branch_guid: '',
      branch_detail: {},
    },
    isAuthenticated: false,
  });

export function useAuthorizationContext() {
  return useContext(AuthorizationContext);
}
