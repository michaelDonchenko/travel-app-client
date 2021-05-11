import { createSlice } from '@reduxjs/toolkit'
import {
  createNewPin,
  getPins,
  getPin,
  getComments,
  createComment,
  removeComment,
  getRating,
  addRating,
  removeMarker,
} from '../actions/markerActions'

const initialState = {
  viewport: {
    width: '100%',
    height: '100vh',
    latitude: 42.526,
    longitude: 15.2551,
    zoom: 4,
    transitionInterpolator: '',
    transitionDuration: '',
  },
  windowWidth: window.innerWidth,
  markers: [],
  currentMarker: null,
  loading: false,
  error: false,
  success: true,
  pinId: null,
  currentPin: null,
  comments: [],
  rating: [],
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCurrentMarker: (state, { payload }) => {
      state.currentMarker = payload
    },
    setViewport: (state, { payload }) => {
      state.viewport.latitude = payload.latitude
      state.viewport.longitude = payload.longitude
      state.viewport.zoom = payload.zoom
      state.viewport.transitionInterpolator =
        payload.transitionInterpolator || ''
      state.viewport.transitionDuration = payload.transitionDuration || ''
    },
    setPinId: (state, { payload }) => {
      state.pinId = payload
    },
    resetPinId: (state, { payload }) => {
      state.pinId = null
    },
    resetError: (state, { payload }) => {
      state.error = null
    },
    windowResizer: (state, { payload }) => {
      state.windowWidth = payload
    },
  },
  extraReducers: {
    //create new pin
    [createNewPin.pending]: (state, { payload }) => {
      state.loading = true
    },
    [createNewPin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.error = false
    },
    [createNewPin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //get pins
    [getPins.pending]: (state, { payload }) => {
      state.loading = true
    },
    [getPins.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.markers = payload.pins
    },
    [getPins.rejected]: (state, { payload }) => {
      state.loading = true
      state.error = payload
      state.markers = []
    },

    //get pin
    [getPin.pending]: (state, { payload }) => {
      state.loading = true
    },
    [getPin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.currentPin = payload.pin
    },
    [getPin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //get comments
    [getComments.pending]: (state, { payload }) => {
      state.loading = true
    },
    [getComments.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.comments = payload.comments.comments
    },
    [getComments.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //create new comment
    [createComment.pending]: (state, { payload }) => {
      state.loading = true
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.comments = payload.comments.comments
    },
    [createComment.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //create new comment
    [removeComment.pending]: (state, { payload }) => {
      state.loading = true
    },
    [removeComment.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.comments = payload.comments.comments
    },
    [removeComment.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //get rating
    [getRating.pending]: (state, { payload }) => {
      state.loading = true
    },
    [getRating.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.rating = payload.rating.ratings
    },
    [getRating.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //add rating
    [addRating.pending]: (state, { payload }) => {
      state.loading = true
    },
    [addRating.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.rating = payload.rating.ratings
    },
    [addRating.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //remove marker
    //add rating
    [removeMarker.pending]: (state, { payload }) => {
      state.loading = true
    },
    [removeMarker.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.markers = payload.pins
    },
    [removeMarker.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
  },
})

export const {
  setCurrentMarker,
  setViewport,
  setPinId,
  resetPinId,
  resetError,
  windowResizer,
} = mapSlice.actions

//selectors
export const mapState = (state) => state.map
export const currentMarkerSelector = (state) => state.map.currentMarker

export default mapSlice.reducer
