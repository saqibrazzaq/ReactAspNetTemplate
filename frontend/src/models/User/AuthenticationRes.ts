export default class AuthenticationRes {
  email?: string;
  roles?: string[];
  accessToken?: string;
  refreshToken?: string;
  emailConfirmed: boolean = false;
  accountId?: string;
  fullName?: string;
  id?: string;
  userName?: string;
  profilePictureUrl?: string;
}
