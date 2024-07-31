import axios from "axios"
const BASE_API_URL = "http://localhost:8080/api/boards"

//게시글 다 가져오기
export const getArticle = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}`)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 상세 조회 (id)
export const getArticleDetail = async (id) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/${id}`)
    console.log("getArticleDetail" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 등록
export const registArticle = async (formData) => {
  console.log(formData)
  try {
    const res = await axios.post(`${BASE_API_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("registArticle" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 수정
export const editArticle = async (id,formData) => {
  console.log(formData)
  try {
    const res = await axios.patch(`${BASE_API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("editArticle" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}


//게시글 삭제
const removeBoard = async (id)=>{
  try {
      const res = await axios.patch(`${BASE_API_URL}/${id}/disable`)                          
      console.log("removeBoard" + res)
      return  res.data
    } catch (e) {
      console.error(e)
      return []                                                               
    }
}