import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addComment,
  createPin,
  fetchComments,
  fetchPin,
  fetchPins,
  deleteComment,
  fetchRating,
  Rate,
  deleteMarker,
} from '../api/map'

export const createNewPin = createAsyncThunk(
  'map/createNewPin',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await createPin(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getPins = createAsyncThunk('map/getPins', async () => {
  try {
    const { data } = await fetchPins()
    return data
  } catch (error) {
    console.log(error.response.data.message)
  }
})

export const getPin = createAsyncThunk(
  'map/getPin',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await fetchPin(id)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getComments = createAsyncThunk(
  'map/getComments',
  async (pinId, { rejectWithValue }) => {
    try {
      const { data } = await fetchComments(pinId)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createComment = createAsyncThunk(
  'map/createComment',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await addComment(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const removeComment = createAsyncThunk(
  'map/removeComment',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await deleteComment(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getRating = createAsyncThunk(
  'map/getRating',
  async (pinId, { rejectWithValue }) => {
    try {
      const { data } = await fetchRating(pinId)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addRating = createAsyncThunk(
  'map/addRating',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await Rate(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const removeMarker = createAsyncThunk(
  'map/removeMarker',
  async (id, { rejectWithValue }) => {
    try {
      await deleteMarker(id)
      const { data } = await fetchPins()
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
