import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../home/profile/types/UserData";
import { fetchUserData } from "./utils/fetchUserData";

const initialState: UserData & { loading: boolean } = {
  userName: "",
  email: "",
  avatar: "",
  coverImage: "",
  postsCount: 0,
  likesCount: 0,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
