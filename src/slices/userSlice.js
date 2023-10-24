import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
}

export const userSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    loggedUser: (state,action) => {
     state.value = action.payload
      console.log(action.payload);
    },
   
  },
})


export const { loggedUser } = userSlice.actions

export default userSlice.reducer