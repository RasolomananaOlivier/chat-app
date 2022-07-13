import { createSlice } from "@reduxjs/toolkit";
import DefaultCollection from 'src/Services/Data/friends/defaultCollection.json'

let initialState = DefaultCollection

const friendSlice = createSlice({
    initialState,
    name: 'friendsCollections',
    reducers: {
        fetchingTheFriendsCollections: (state, action) => {
            return action.payload;
        },
    }
})

export const { fetchingTheFriendsCollections } = friendSlice.actions;

export default friendSlice.reducer;