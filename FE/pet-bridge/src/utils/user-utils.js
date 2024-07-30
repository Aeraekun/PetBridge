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

// 유저 정보를 세션 스토리지에 저장
export const setUserInfosAtSession = (userInfos) => {
  console.log("setUserInfosAtSession", userInfos)
  Object.keys(userInfos).forEach((key) => {
    sessionStorage.setItem(key, userInfos[key])
  })
}

// 유저 정보를 세선 스토리지에서 받아와서 상태에 저장하기 위해 넘겨줌
export const getUserInfosFromSession = () => {
  const userInfoKeys = [
    "nickname",
    "id",
    "email",
    "birth",
    "phone",
    "isAuthenticated",
  ]
  const userInfos = {}

  userInfoKeys.forEach((key) => {
    const item = sessionStorage.getItem(key)
    console.log(item, key)
    if (item) {
      userInfos[key] = item
    }
  })

  console.log(userInfos)

  return userInfos
}
