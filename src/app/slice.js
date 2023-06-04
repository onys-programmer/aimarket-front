import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../services/api/api';

const initialState = {
  user: null,
  token: "",
  mainPosts: [],
  uploadedPostImage: null,
  currentPostComments: [],
}

// deleteUser API 요청을 위한 비동기 액션 생성자
export const requestDeleteUser = createAsyncThunk('user/deleteUser', async (userId, thunkAPI) => {
  try {
    // deleteUser API 호출
    await api.deleteUser(userId);
    // 로그아웃 처리
    thunkAPI.dispatch(logOut());
    if (window.confirm('회원 탈퇴가 완료되었습니다.')) {
      window.location.href = '/';
    }
  } catch (error) {
    // 오류 처리
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    deleteToken: (state) => {
      state.token = "";
      localStorage.removeItem('token');
    },
    deleteUser: (state) => {
      localStorage.removeItem('user');
      state.user = null;
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
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  updateUser,
  logOut,
  updateToken,
  deleteToken,
  deleteUser,
  updateMainPosts,
  addMainPosts,
  updateUploadedPostImage,
  updateCurrentPostComments
} = slice.actions;

export default slice.reducer;
