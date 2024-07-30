import axios from "axios"
const BASE_API_URL = "http://localhost:8080/api"

//게시글 다 가져오기
export const getArticle = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/boards`)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//게시글 상세 조회 (id)
export const getArticleDetail = async (id) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/boards/${id}`)
    console.log("getArticleDetail" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const registArticle = async (formData) => {
  console.log(formData)
  try {
    const res = await axios.post(`${BASE_API_URL}/boards`, formData, {
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

export const editArticle = async (id, article) => {
  try {
    const res = await axios.patch(`${BASE_API_URL}/boards/${id}`, article)
    console.log("editArticle" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}
