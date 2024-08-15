import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getChatRoomList} from "api/chat-api"
import {selectId} from "features/user/users-slice"
import {useSelector} from "react-redux"

const initialState = {
  isChatModalOpen: false,
  isChatMinimized: true,
  currentChatId: null,
  chatMessages: {},
  chatRoomInfos: [],
  opponentInfo: {
    id: "",
    img: "",
    nickname: "",
  },
}

export const getChatRoomListThunk = createAsyncThunk(
  "chat/getChatRoomList",
  async (_, {rejectWithValue}) => {
    const userId = useSelector(selectId)
    try {
      const res = await getChatRoomList(userId)

      if (res.data) {
        return res.data
      } else {
        return rejectWithValue("채팅 정보가 없습니다.")
      }
    } catch (error) {
      return error
    }
  }
)

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatModalOpen: (state, action) => {
      state.isChatModalOpen = action.payload
    },
    setIsChatMinimized: (state) => {
      state.isChatMinimized = !state.isChatMinimized
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = Number(action.payload)
    },
    setChatRoomList: (state, action) => {
      state.chatRoomInfos = action.payload
    },
    setOpponentInfo: (state, action) => {
      state.opponentInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatRoomListThunk.fulfilled, (state, action) => {
        state.chatRoomInfos = action.payload
      })
      .addCase(getChatRoomListThunk.rejected, (state, action) => {
        console.log("chat-slice.js ", action.payload)
      })
  },
})

// Selector
export const selectChatInfo = (state) => state.chat
export const selectIsChatModalOpen = (state) => state.chat.isChatModalOpen
export const selectIsChatMinimized = (state) => state.chat.isChatMinimized
export const selectCurrentChatId = (state) => state.chat.currentChatId
export const selectOpponentInfo = (state) => state.chat.opponentInfo

// Action
export const {
  setIsChatModalOpen,
  setIsChatMinimized,
  setCurrentChatId,
  setOpponentInfo,
} = chatSlice.actions

// Reducer
export default chatSlice.reducer
