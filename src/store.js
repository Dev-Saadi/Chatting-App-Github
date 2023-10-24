import { configureStore } from '@reduxjs/toolkit'
import  useReducer  from './slices/userSlice'

export const store = configureStore({
  reducer: {
    loggedUser: useReducer
  },
})