import { createSlice } from '@reduxjs/toolkit'
import {
  getForgotPassword,
  login,
  logout,
  register,
  resetPasswordValidation,
  createResetPassword,
} from '../actions/authActions'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const initialState = {
  user: cookies.get('user') ? cookies.get('user') : null,
  loading: false,
  error: null,
  message: null,
  resetPasswordSuccess: null,
  resetPasswordError: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null
    },
    resetError: (state) => {
      state.error = null
    },
  },
  extraReducers: {
    //login
    [login.pending]: (state, { payload }) => {
      state.loading = true
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.user = payload.user
      state.message = payload.message
      payload.error = null
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false
      payload.errors
        ? (state.error = payload.errors[0].msg)
        : (state.error = payload.message)
    },

    //logout
    [logout.pending]: (state, { payload }) => {
      state.loading = true
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.message = payload.message
      state.user = null
      payload.error = null
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    //register
    [register.pending]: (state, { payload }) => {
      state.loading = true
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.message = payload.message
      payload.error = null
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false
      payload.errors
        ? (state.error = payload.errors[0].msg)
        : (state.error = payload.message)
    },

    //get forgot password
    [getForgotPassword.pending]: (state, { payload }) => {
      state.loading = true
    },
    [getForgotPassword.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.message = payload.message
      payload.error = null
    },
    [getForgotPassword.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },

    //reset passsword validation
    [resetPasswordValidation.pending]: (state, { payload }) => {
      state.loading = true
    },
    [resetPasswordValidation.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.resetPasswordSuccess = payload.message
      payload.resetPasswordError = null
    },
    [resetPasswordValidation.rejected]: (state, { payload }) => {
      state.loading = false
      state.resetPasswordError = payload.message
    },

    //create passsword reset
    [createResetPassword.pending]: (state, { payload }) => {
      state.loading = true
    },
    [createResetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.message = payload.message
      payload.error = null
    },
    [createResetPassword.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
  },
})

export const { resetMessage, resetError } = authSlice.actions

export const authState = (state) => state.auth
export default authSlice.reducer
