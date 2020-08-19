// @flow
export type UserStore = {
  uid: string,
  displayName: ?string,
  photoURL: ?string,
  email: string,
  emailVerified: boolean,
  phoneNumber: ?string,
  isAnonymous: boolean,
  tenantId: ?string,
  providerData: Array<any>,
  apiKey: string,
  appName: string,
  authDomain: string,
  stsTokenManager: {
    apiKey: string,
    refreshToken: string,
    accessToken: string,
    expirationTime: string
  },
  redirectEventId: ?string,
  lastLoginAt: string,
  createdAt: string,
  multiFactor: { ... },
  errorMessage: ?string
};
