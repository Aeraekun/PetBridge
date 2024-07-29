import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axiosInstance from "api/axios-instance"
import {postLoginUser} from "api/users-api"
axiosInstance

// usersSlice의 상태 초기화
const initialState = {
  userName: "user",
  userId: "1",
  isAuthenticated: false,
  loading: false,
  error: null,
}

// 로그인
// 비동기 로그인 Thunk Action 생성
export const loginUserThunk = createAsyncThunk(
  // user/loginUser라는 Action을 정의
  "user/loginUser",
  // async - await 문법으로 프로미스 객체 활용
  async (loginData, {rejectWithValue}) => {
    console.log("usersApi.ks => loginUser => console.log(loginData)", loginData)

    const res = await postLoginUser(loginData)

    // 응답을 200번으로 받지 못한다면, 에러 반환
    if (res.status !== 200) {
      // 에러 데이터를 담아서 반환함 (로그인 실패)
      const {data} = res.response
      console.log(
        "usersApi.ks => loginUser => catch => console.log(error)",
        res
      )
      return rejectWithValue(data)
    }

    console.log("loginUserThunk fulfilled")
    return res.data
  }
)

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// 선택자 함수 정의
export const selectUserName = (state) => state.user.userName
export const selectUserId = (state) => state.user.userId
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export const selectLoading = (state) => state.user.loading
export const selectError = (state) => state.user.error
export const {logOut, setAuthenticated} = usersSlice.actions
export default usersSlice.reducer
