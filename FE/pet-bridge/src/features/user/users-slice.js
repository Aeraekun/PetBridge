import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {getUserInfo, postLoginUser} from "api/users-api"
import {setUserInfosAtSession} from "utils/user-utils"
getUserInfo

// usersSlice의 상태 초기화
const initialState = {
  nickname: "",
  id: "1",
  email: "",
  birth: "",
  phone: "",
  img: "",
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
  async (loginData, {rejectWithValue, dispatch}) => {
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
    dispatch(getUserInfoThunk())
    return res.data
  }
)

// 사용자 정보를 가져오는 getUserInfoThunk
export const getUserInfoThunk = createAsyncThunk(
  "user/getUserInfo",
  async (_, {rejectWithValue}) => {
    const res = await getUserInfo()

    if (res.status !== 200) {
      return rejectWithValue(res.response.data)
    }
    setUserInfosAtSession(res.data)
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
    setUserInfos: (state, action) => {
      state.id = action.payload.id
      state.nickname = action.payload.nickname
      state.email = action.payload.email
      state.birth = action.payload.birth
      state.phone = action.payload.phone
      state.img = action.payload.img
      state.isAuthenticated = true
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
      .addCase(getUserInfoThunk.fulfilled, (state, action) => {
        state.id = action.payload.id
        state.nickname = action.payload.nickname
        state.email = action.payload.email
        state.birth = action.payload.birth
        state.phone = action.payload.phone
        state.img = action.payload.img
        state.isAuthenticated = true
      })
  },
})

// 선택자 함수 정의
export const selectNickname = (state) => state.user.nickname
export const selectId = (state) => state.user.id
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export const selectLoading = (state) => state.user.loading
export const selectError = (state) => state.user.error
export const {logOut, setAuthenticated, setUserInfos} = usersSlice.actions
export default usersSlice.reducer
