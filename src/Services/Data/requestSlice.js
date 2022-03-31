import { createSlice } from "@reduxjs/toolkit";

let initialState = [

    {
        _id: '5',
        lastName: 'Jimmy',
        firstName: 'Doe',
        avatarId: '16',
        email: 'jimmy@gmail.com',
        bio: 'I am jimmy',

    },
    {
        _id: '6',
        lastName: 'Eren',
        firstName: 'Doe',
        avatarId: '16',
        email: 'jimmy@gmail.com',
        bio: 'I am jimmy',

    },

]

const requestSlice = createSlice({
    initialState,
    name: 'friendsCollections',
    reducers: {
        deleteRequestFriend: (state, action) => {
            // console.log(action.payload);
            let updated = [];
            state.forEach((req) => {
                if (req._id !== action.payload) {
                    updated.push(req)
                }
            });

            return updated;
        }

    }
})

export const { deleteRequestFriend } = requestSlice.actions

export default requestSlice.reducer;