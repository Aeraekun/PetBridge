import {createSlice} from "@reduxjs/toolkit"
import {loginUser} from "api/usersApi"

// userSlice의 상태 초기화
const initialState = {
  name: "",
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInToggled: (state) => {
      state.isAuthenticated = !state.isAuthenticated
    },
    logOut: (state) => {
      state.name = ""
      state.accessToken = ""
      state.refreshToken = ""
      state.isAuthenticated = false
    },
    logIn: (state) => {
      state.name = "test"
      state.accessToken = ""
      state.refreshToken = ""
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.name
        state.accessToken = action.payload.headers.authorization
        state.refreshToken = action.payload.headers["authorization-refresh"]
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// 선택자 함수 정의
export const selectisAuthenticated = (state) => state.user.isAuthenticated
export const selectAccessToken = (state) => state.user.accessToken
export const selectRefreshToken = (state) => state.user.refreshToken
export const selectLoading = (state) => state.user.loading
export const selectError = (state) => state.user.error
export const {logIn, logOut} = userSlice.actions
export default userSlice.reducer
