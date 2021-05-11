import axios from 'axios'
axios.defaults.withCredentials = true
const server_url = process.env.REACT_APP_SERVER_URL

export const loginUser = async (obj) =>
  await axios.post(`${server_url}/login`, obj)

export const registerUser = async (obj) =>
  await axios.post(`${server_url}/register`, obj)

export const logoutUser = async () => await axios.post(`${server_url}/logout`)

export const forgotPassword = async (email) =>
  await axios.post(`${server_url}/forgot-password`, { email })

export const resetPasswordValidator = async (token) =>
  await axios.get(`${server_url}/password-reset-validation/${token}`)

export const resetPasswordAction = async (obj) =>
  await axios.post(`${server_url}/password-reset-action`, obj)
