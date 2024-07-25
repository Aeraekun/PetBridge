import {createSlice} from "@reduxjs/toolkit"
import {loginUser} from "api/usersApi"

// usersSlice의 상태 초기화
const initialState = {
  userName: "user",
  userId: "1",
  accessToken: "",
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.accessToken = ""
      state.isAuthenticated = false
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      state.isAuthenticated = !!action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// 선택자 함수 정의
export const selectUserName = (state) => state.user.userName
export const selectUserId = (state) => state.user.userId
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export const selectAccessToken = (state) => state.user.accessToken
export const selectLoading = (state) => state.user.loading
export const selectError = (state) => state.user.error
export const {logIn, logOut} = usersSlice.actions
export default usersSlice.reducer
