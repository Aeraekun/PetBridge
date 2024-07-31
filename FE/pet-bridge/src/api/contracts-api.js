import axiosInstance from "./axios-instance"

export const getUserContracts = (userId) => {
  const res = axiosInstance.get(`/users/contracts/user/${userId}`)
  return res
}
