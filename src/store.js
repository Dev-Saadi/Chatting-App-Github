import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices/userSlice'
import activeChatSlice from './slices/activeChatSlice'

export const store = configureStore({
  reducer: {
    loggedUser: useReducer,
    activeChat: activeChatSlice
  },
})