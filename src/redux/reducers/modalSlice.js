import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loginModal: false,
  registerModal: false,
  aboutModal: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state, { payload }) => {
      state.loginModal = true
    },
    closeLoginModal: (state) => {
      state.loginModal = false
    },

    openRegisterModal: (state, { payload }) => {
      state.registerModal = true
    },
    closeRegisterModal: (state) => {
      state.registerModal = false
    },

    openAboutModal: (state, { payload }) => {
      state.aboutModal = true
    },
    closeAboutModal: (state) => {
      state.aboutModal = false
    },
  },
  extraReducers: {},
})

export const {
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
  openAboutModal,
  closeAboutModal,
} = modalSlice.actions

export const modalState = (state) => state.modal
export default modalSlice.reducer
