import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  component: 'LOGIN',
  snackBarData: {
    open: false,
    message: ""
  },
  loginCredentials: {},
  profileData: {}
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setComponent: (state, actions) => {
      state.component = actions.payload
    },
    snackBarAction: (state, actions) => {
      state.snackBarData = actions.payload
    },
    setLoginCredentials: (state, actions) => {
      state.loginCredentials = actions.payload
    },
    setProfiledata: (state, actions) => {
      state.profileData = actions.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { setComponent, snackBarAction, setLoginCredentials, setProfiledata } = counterSlice.actions

export default counterSlice.reducer