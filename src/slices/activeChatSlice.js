import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const activeChatSlice = createSlice({
    name: 'activeChatSlice',
    initialState,
    reducers: {
        activeChat: (state, action) => {
            state.value = action.payload

        },

    },
})


export const { activeChat } = activeChatSlice.actions

export default activeChatSlice.reducer