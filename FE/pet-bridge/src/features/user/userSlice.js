import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {name: "", loggedIn: false},
  reducers: {
    logIn: (state, action) => {
      state.name = action.payload
      state.loggedIn = true
    },
    logOut: (state) => {
      state.name = ""
      state.loggedIn = false
    },
  },
})

// 선택자 함수 정의
export const selectLoggedIn = (state) => state.user.loggedIn
export const {logIn, logOut} = userSlice.actions
export default userSlice.reducer
