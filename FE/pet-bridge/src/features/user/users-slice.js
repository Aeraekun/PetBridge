import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {
  getUserInfo,
  postLoginUser,
  getIsDuplicatedNickname,
  postEmailVerificationCode,
  postPhoneVerificationCode,
} from "api/users-api"
import {setUserInfosAtSession} from "utils/user-utils"

// usersSlice의 상태 초기화
const initialState = {
  nickname: "",
  id: "",
  email: "",
  birth: "",
  phone: "",
  image: "",
  role: "",
  isAuthenticated: false,
  loading: false,
  isLoadingEmailCode: false,
  isLoadingPhoneCode: false,
  isLoadingDuplication: false,
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
    try {
      const res = await postLoginUser(loginData)

      // 로그인에 성공하며 바로 유저 정보를 받아온다.
      console.log("loginUserThunk fulfilled")
      dispatch(getUserInfoThunk())
      return res.data
    } catch (error) {
      // 응답을 200번으로 받지 못한다면, 에러 반환
      console.log(
        "usersApi.ks => loginUser => catch => console.log(error)",
        error
      )
      return rejectWithValue("로그인 실패. 아이디와 비밀번호를 확인해주세요.")
    }
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

// 닉네임 중복 검사를 하는 getIsDuplicatedNicknameThunk
export const getIsDuplicatedNicknameThunk = createAsyncThunk(
  "user/getIsDuplicatedNickname",
  async (nickname, {rejectWithValue}) => {
    console.log("-----THUNK-----")
    try {
      const res = await getIsDuplicatedNickname(nickname)

      if (res.status === 200) {
        return rejectWithValue(
          "이미 있는 닉네임입니다. 다른 닉네임을 입력해주세요."
        )
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return true
      } else {
        console.log("요청에 실패했습니다.")
        return rejectWithValue("요청에 실패했습니다. 다시 시도해주세요.")
      }
    }
  }
)

// 전화번호 인증 Thunk
export const postPhoneVerificationCodeThunk = createAsyncThunk(
  "user/postPhoneVerificationCode",
  async (phoneData) => {
    console.log("-----PHONE THUNK-----")
    try {
      const res = await postPhoneVerificationCode(phoneData)
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
)

// 이메일 인증 Thunk
export const postEmailVerificationCodeThunk = createAsyncThunk(
  "user/postEmailVerificationCode",
  async (emailData) => {
    console.log("-----EMAIL THUNK-----")
    try {
      const res = await postEmailVerificationCode(emailData)
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
)

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.id = ""
      state.nickname = ""
      state.email = ""
      state.birth = ""
      state.phone = ""
      state.image = ""
      state.role = ""
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
      state.image = action.payload.image
      state.role = action.payload.role
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
        state.image = action.payload.image
        state.role = action.payload.role
        state.isAuthenticated = true
      })
      .addCase(getIsDuplicatedNicknameThunk.pending, (state) => {
        state.isLoadingDuplication = true
      })
      .addCase(getIsDuplicatedNicknameThunk.fulfilled, (state) => {
        state.isLoadingDuplication = false
      })
      .addCase(getIsDuplicatedNicknameThunk.rejected, (state) => {
        state.isLoadingDuplication = false
      })
      .addCase(postEmailVerificationCodeThunk.pending, (state) => {
        state.isLoadingEmailCode = true
      })
      .addCase(postEmailVerificationCodeThunk.fulfilled, (state) => {
        state.isLoadingEmailCode = false
      })
      .addCase(postEmailVerificationCodeThunk.rejected, (state) => {
        state.isLoadingEmailCode = false
      })
      .addCase(postPhoneVerificationCodeThunk.pending, (state) => {
        state.isLoadingPhoneCode = true
      })
      .addCase(postPhoneVerificationCodeThunk.fulfilled, (state) => {
        state.isLoadingPhoneCode = false
      })
      .addCase(postPhoneVerificationCodeThunk.rejected, (state) => {
        state.isLoadingPhoneCode = false
      })
  },
})

// 선택자 함수 정의
export const selectNickname = (state) => state.user.nickname
export const selectId = (state) => state.user.id
export const selectEmail = (state) => state.user.email
export const selectBirth = (state) => state.user.birth
export const selectPhone = (state) => state.user.phone
export const selectImage = (state) => state.user.image
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export const selectIsLoadingDuplication = (state) =>
  state.user.isLoadingDuplication
export const selectLoading = (state) => state.user.loading
export const selectError = (state) => state.user.error
export const selectRole = (state) => state.user.role
export const selectIsLoadingPhoneCode = (state) => state.user.isLoadingPhoneCode
export const selectIsLoadingEmailCode = (state) => state.user.isLoadingEmailCode
export const {logOut, setAuthenticated, setUserInfos} = usersSlice.actions
export default usersSlice.reducer
