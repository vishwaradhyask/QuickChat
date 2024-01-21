import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  component: 'LOGIN',
  snackBarData: {
    open: false,
    message: ""
  },
  loginCredentials: {}
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

  },
})

// Action creators are generated for each case reducer function
export const { setComponent, snackBarAction, setLoginCredentials } = counterSlice.actions

export default counterSlice.reducer