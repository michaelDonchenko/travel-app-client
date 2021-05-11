import axios from 'axios'
axios.defaults.withCredentials = true
const server_url = process.env.REACT_APP_SERVER_URL

export const createPin = async (obj) =>
  await axios.post(`${server_url}/create-pin`, obj)

export const fetchPins = async () => await axios.get(`${server_url}/get-pins`)

export const fetchPin = async (id) =>
  await axios.get(`${server_url}/get-pin/${id}`)

export const fetchComments = async (pinId) =>
  await axios.get(`${server_url}/get-comments/${pinId}`)

export const addComment = async (obj) =>
  await axios.post(`${server_url}/add-comment`, obj)

export const deleteComment = async (obj) =>
  await axios.delete(
    `${server_url}/delete-comment/${obj.pinId}/${obj.commentId}`
  )

export const fetchRating = async (pinId) =>
  await axios.get(`${server_url}/get-rating/${pinId}`)

export const Rate = async (obj) =>
  await axios.post(`${server_url}/add-rating`, obj)

export const deleteMarker = async (id) =>
  await axios.delete(`${server_url}/delete-pin/${id}`)
