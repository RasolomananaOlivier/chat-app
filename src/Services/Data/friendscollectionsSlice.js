import { createSlice } from "@reduxjs/toolkit";

let initialState = [
    {
        _id: '2',
        lastName: 'Joe',
        firstName: 'Doe',
        avatarFileName: '',
        email: 'joe@gmail.com',
        bio: 'lorem lorem lorem',

    },
    {
        _id: '3',
        lastName: 'Jenny',
        firstName: 'Doe',
        avatarFileName: '',
        email: 'jenny@gmail.com',
        bio: 'lorem lorem lorem',

    },
    {
        _id: '4',
        lastName: 'Ben',
        firstName: 'Doe',
        avatarFileName: '',
        email: 'ben@gmail.com',
        bio: 'lorem lorem lorem',

    }
]

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