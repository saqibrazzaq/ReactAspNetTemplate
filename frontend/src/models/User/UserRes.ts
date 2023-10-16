import Common from "../../utility/Common";

export default class UserRes {
  userName?: string;
  email?: string;
  emailConfirmed?: boolean;
  profilePictureUrl?: string = Common.DEFAULT_PROFILE_PICTURE;
  roles?: string[];
}
