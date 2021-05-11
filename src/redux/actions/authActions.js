import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPasswordAction,
  resetPasswordValidator,
} from '../api/auth'

export const login = createAsyncThunk(
  'auth/login',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await loginUser(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await registerUser(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await logoutUser()
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getForgotPassword = createAsyncThunk(
  'auth/getForgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await forgotPassword(email)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetPasswordValidation = createAsyncThunk(
  'auth/resetPasswordValidation',
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await resetPasswordValidator(token)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createResetPassword = createAsyncThunk(
  'auth/createResetPassword',
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await resetPasswordAction(obj)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
