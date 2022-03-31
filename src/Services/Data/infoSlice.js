import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    _id: '1',
    firstName: 'Olivier',
    lastName: 'Ras',
    passwd: '1234',
    email: 'oli@gmail.com',
    bio: 'Lorem lorem lorem blabla',
    avatarId: '1'
}

const infoSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        add: (state, action) => {

            state = action.payload;
        }
    }
})

export const { add } = infoSlice.actions;

export default infoSlice.reducer;