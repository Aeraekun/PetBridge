import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isChatModalOpen: false,
  isChatMinimized: false,
  currentChatId: null,
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatModalOpen: (state) => {
      state.isChatModalOpen = !state.isChatModalOpen
    },
    setIsChatMinimized: (state) => {
      state.isChatMinimized = !state.isChatMinimized
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload
    },
  },
})

// Selector
export const selectChatInfo = (state) => state.chat
export const selectIsChatModalOpen = (state) => state.chat.isChatModalOpen
export const selectIsChatMinimized = (state) => state.chat.isChatMinimized
export const selectCurrentChatId = (state) => state.chat.currentChatId

// Action
export const {setIsChatModalOpen, setIsChatMinimized, setCurrentChatId} =
  chatSlice.actions

// Reducer
export default chatSlice.reducer
