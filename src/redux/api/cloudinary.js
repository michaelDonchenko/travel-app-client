import axios from 'axios'
axios.defaults.withCredentials = true
const server_url = process.env.REACT_APP_SERVER_URL

export const uploadImages = async (obj) =>
  await axios.post(`${server_url}/upload-images`, obj)

export const getPinImages = async (obj) =>
  await axios.get(`${server_url}/get-images/${obj}`)

export const deleteImage = async (obj) =>
  await axios.delete(`${server_url}/delete-image`, { data: obj })
