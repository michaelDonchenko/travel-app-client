import { createSlice } from '@reduxjs/toolkit'
import { addImages, getImages, removeImage } from '../actions/cloudinaryActions'

const initialState = {
  images: [],
  loading: false,
  error: false,
}

export const cloudinarySlice = createSlice({
  name: 'cloudinary',
  initialState,
  reducers: {
    returnError: (state, { payload }) => {
      state.error = payload
    },
    resetError: (state, { payload }) => {
      state.error = null
    },
  },
  extraReducers: {
    //create new image
    [addImages.pending]: (state, { payload }) => {
      state.loading = true
    },
    [addImages.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.images = payload.pinImages.images
      state.error = false
    },
    [addImages.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //get pin images
    [getImages.pending]: (state, { payload }) => {
      state.loading = true
    },
    [getImages.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.images = payload.pinImages.images ? payload.pinImages.images : []
      state.error = false
    },
    [getImages.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //remove iamge
    [removeImage.pending]: (state, { payload }) => {
      state.loading = true
    },
    [removeImage.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.images = payload.pinImages.images
      state.error = false
    },
    [removeImage.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
  },
})

export const { returnError, resetError } = cloudinarySlice.actions

export const cloudinaryState = (state) => state.cloudinary
export default cloudinarySlice.reducer
