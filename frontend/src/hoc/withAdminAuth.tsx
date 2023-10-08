import jwt_decode from "jwt-decode";
import Common from "../utility/Common";
import { Roles } from "../models/User/Roles";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token") ?? "";

    if (accessToken) {
      const decode: {
        roles: string;
      } = jwt_decode(accessToken);
      let arrRoles = decode.roles.split(",");
      if (
        arrRoles?.indexOf(Roles.Admin) ||
        arrRoles?.indexOf(Roles.Manager) ||
        arrRoles?.indexOf(Roles.Owner)
      ) {
        return <WrappedComponent {...props} />;
      }
    } else {
      window.location.replace("/login");
      return null;
    }

    window.location.replace("/access-denied");
    return null;
  };
};

export default withAdminAuth;
