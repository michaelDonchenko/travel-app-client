import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './reducers/mapSlice'
import modalReducer from './reducers/modalSlice'
import authReducer from './reducers/authSlice'
import cloudinaryReducer from './reducers/cloudinarySlice'

export const store = configureStore({
  reducer: {
    map: mapReducer,
    modal: modalReducer,
    auth: authReducer,
    cloudinary: cloudinaryReducer,
  },
})
