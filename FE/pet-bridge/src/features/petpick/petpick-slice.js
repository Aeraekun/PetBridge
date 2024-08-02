import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import dummydata from "components/petpick/dummydata"

//상태 초기화
const initialState = [
  {
    id: "",
    userId: "",
    boardId: "",
    animalId: "",
    title: "",
    content: "",
    thumbnail: "",
    video: "",
    registTime: "",
    userImage: "",
    like: false,
    follow: false,
    comments: [
      {
        id: 0,
        userId: 0,
        petPickId: 0,
        content: "",
        registTime: "",
        userImage: "",
      },
    ],
  },
]

// 펫픽정보 가져오기
export const fetchPetpickList = createAsyncThunk(
  "petpick/fetchPetpickList",
  async (petpickId) => {
    const petpickList = dummydata[petpickId]
    return petpickList
  }
)

// slice 정의
export const usersSlice = createSlice({
  name: "petpick",
  initialState,
  reducers: {
    setNowPetpick: (state, action) => {
      const {
        id,
        userId,
        boardId,
        animalId,
        title,
        content,
        thumbnail,
        video,
        registTime,
        userImage,
        like,
        follow,
        comments,
      } = action.payload

      // 상태 업데이트
      state[0].id = id || state.id
      state[0].userId = userId || state.userId
      state[0].boardId = boardId || state.boardId
      state[0].animalId = animalId || state.animalId
      state[0].title = title || state.title
      state[0].content = content || state.content
      state[0].thumbnail = thumbnail || state.thumbnail
      state[0].video = video || state.video
      state[0].registTime = registTime || state.registTime
      state[0].userImage = userImage || state.userImage
      state[0].like = like !== undefined ? like : state.like
      state[0].follow = follow !== undefined ? follow : state.follow
      state[0].comments = comments || state.comments
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetpickList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPetpickList.fulfilled, (state, action) => {
        state.status = "succeeded"
        state = {...state, ...action.payload} // Ensure the payload structure fits the state
      })
      .addCase(fetchPetpickList.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const selectPetpickData = (state) => state.petpick[0]
// export const selectPetpickStatus = (state) => state.petpick.status
// export const selectPetpickError = (state) => state.petpick.error
export const {setNowPetpick} = usersSlice.actions
export default usersSlice.reducer
