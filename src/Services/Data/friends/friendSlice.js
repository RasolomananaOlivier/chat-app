import { createSlice } from "@reduxjs/toolkit";
import DefaultCollection from 'src/Services/Data/friends/default.json'

let initialState = DefaultCollection

const friendSlice = createSlice({
    initialState,
    name: 'friend',
    reducers: {
        updateFriendData: (state, action) => {
            return {
                ...action.payload
            }
        }
    }

})

export const { updateFriendData } = friendSlice.actions;

export default friendSlice.reducer;