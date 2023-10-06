export default class ChangePasswordRequestDto {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}