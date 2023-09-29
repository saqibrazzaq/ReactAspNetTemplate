export default class AuthenticationResponseDto {
  email?: string;
  roles?: string[];
  accessToken?: string;
  refreshToken?: string;
  emailConfirmed: boolean = false;
  accountId?: string;
}