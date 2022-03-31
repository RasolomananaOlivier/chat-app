import { createSlice } from "@reduxjs/toolkit";

let initialState = [
    {
        _id: '2',
        lastName: 'Joe',
        firstName: 'Doe',
        avatarId: '15',
        email: 'joe@gmail.com',
        bio: 'lorem lorem lorem',

    },
    {
        _id: '3',
        lastName: 'Jenny',
        firstName: 'Doe',
        avatarId: '15',
        email: 'jenny@gmail.com',
        bio: 'lorem lorem lorem',

    },
    {
        _id: '4',
        lastName: 'Ben',
        firstName: 'Doe',
        avatarId: '15',
        email: 'ben@gmail.com',
        bio: 'lorem lorem lorem',

    }
]

const friendSlice = createSlice({
    initialState,
    name: 'friendsCollections',
    reducers: {
        addNewFriend: (state, action) => {
            state.push(
                action.payload
            )
        }
    }

})

export const { addNewFriend } = friendSlice.actions

export default friendSlice.reducer;