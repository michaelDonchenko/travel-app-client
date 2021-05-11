import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteImage, getPinImages, uploadImages } from '../api/cloudinary'

export const addImages = createAsyncThunk(
  'auth/addImages',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await uploadImages(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getImages = createAsyncThunk(
  'auth/getImages',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await getPinImages(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const removeImage = createAsyncThunk(
  'auth/removeImage',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await deleteImage(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
