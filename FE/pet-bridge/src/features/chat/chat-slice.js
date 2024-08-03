import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isChatModalOpen: false,
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatModalOpen: (state) => {
      state.isChatModalOpen = !state.isChatModalOpen
    },
  },
})

export const selectIsChatModalOpen = (state) => state.chat.isChatModalOpen
export const {setIsChatModalOpen} = chatSlice.actions

export default chatSlice.reducer
