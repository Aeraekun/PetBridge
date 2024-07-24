import {configureStore} from "@reduxjs/toolkit"
import userReducer from "features/user/userSlice"
import {setAuthToken, setRefreshToken} from "api/axiosInstance"

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

setAuthToken(store.getState) // 스토어의 getState 함수를 전달
setRefreshToken()

export default store
