// 액세스 토큰을 세션에서 가져옴
export const getAccessTokenFromSession = () => {
  const accessToken = sessionStorage.getItem("accessToken")
  return accessToken
}

// 액세스 토큰을 세션에 저장
export const setAccessTokenAtSession = (accessToken) => {
  sessionStorage.setItem("accessToken", accessToken)
  console.log("user-utils.js > accessToken set:", accessToken)
  return accessToken
}

// 리프레시 토큰을 로컬 스토리지에서 가져옴
export const getRefreshTokenFromLocalStorage = () => {
  const refreshToken = localStorage.getItem("refreshToken")
  return refreshToken
}

// 리프레시 토큰을 로컬 스토리지에 저장
export const setRefreshTokenAtLocalStorage = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken)
  console.log("user-utils.js > refreshToken set:", refreshToken)
  return refreshToken
}
