import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  thumbnailImages: [],
}

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    deleteToken: (state) => {
      state.token = null;
    },
    updateThumbnailImages: (state, action) => {
      state.thumbnailImages = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateToken, deleteToken, updateThumbnailImages } = slice.actions;

export default slice.reducer;
