import {configureStore} from "@reduxjs/toolkit"
import userReducer from "features/user/users-slice"

// Redux ToolKit의 configureStore 동작
// reducer: {} 안에 입력하는 모든 reducer를 root reducer에 포함시킴
// root reducer를 사용하는 store를 정의
// thunk 미들웨어 추가
// 다른 몇몇개의 미들웨어 추가
// Redux DevTools를 연결
const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export default store
