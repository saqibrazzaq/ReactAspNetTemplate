import { createSlice } from "@reduxjs/toolkit";
import AuthenticationRes from "../../models/User/AuthenticationRes";

export const emptyUserState: AuthenticationRes = {
  userName: "",
  id: "",
  email: "",
  roles: [],
  emailConfirmed: false,
  accessToken: "",
  accountId: "",
  fullName: "",
  refreshToken: "",
  profilePictureUrl: "",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.userName = action.payload.userName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.accountId = action.payload.accountId;
      state.emailConfirmed = action.payload.emailConfirmed;
      state.fullName = action.payload.fullName;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.profilePictureUrl = action.payload.profilePictureUrl;
    },
  },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
