import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    _id: '2',
    lastName: 'Joe',
    firstName: 'Doe',
    avatarId: '15',
    email: 'joe@gmail.com',
    bio: 'lorem lorem lorem',

}

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