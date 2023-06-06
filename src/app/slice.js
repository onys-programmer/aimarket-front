import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
  mainPosts: [],
  uploadedPostImage: null,
  currentPostComments: [],
  profileUploadModalVisibility: false,
  profileImage: "",
  profileImageBase64: "",
};

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    deleteToken: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
    updateMainPosts: (state, action) => {
      state.mainPosts = action.payload;
    },
    addMainPosts: (state, action) => {
      state.mainPosts = [...state.mainPosts, ...action.payload];
    },
    updateUploadedPostImage: (state, action) => {
      state.uploadedPostImage = action.payload;
    },
    updateCurrentPostComments: (state, action) => {
      state.currentPostComments = action.payload;
    },
    updateProfileUploadModalVisibility: (state, action) => {
      state.profileUploadModalVisibility = action.payload;
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    updateProfileImageBase64: (state, action) => {
      state.profileImageBase64 = action.payload;
    },
    updateUserProfileImage: (state, action) => {
      state.user.image = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUser,
  logOut,
  updateToken,
  deleteToken,
  updateMainPosts,
  addMainPosts,
  updateUploadedPostImage,
  updateCurrentPostComments,
  updateProfileUploadModalVisibility,
  updateProfileImage,
  updateProfileImageBase64,
  updateUserProfileImage,
} = slice.actions;

export default slice.reducer;
