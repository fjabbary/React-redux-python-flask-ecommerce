import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: sessionStorage.getItem('token') || "",
  loginName: "",
  loginEmail: "",
  id: "",
  userLoaded: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      sessionStorage.setItem("token", action.payload);
    },
    removeToken: (state, action) => {
      state.token = "";
      sessionStorage.removeItem('token')
    }
  }
})


export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;