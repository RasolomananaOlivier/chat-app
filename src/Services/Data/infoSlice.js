import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    _id: '1',
    firstName: 'Olivier',
    lastName: 'Ras',
    passwd: '1234',
    email: 'oli@gmail.com',
    bio: 'Lorem lorem lorem blabla',
    avatarFileName: '',
    birthday: '',
}

const infoSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        updateTheUserInfo: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.birthday = action.payload.birthday;
            state.email = action.payload.email;
        },
        updateTheUserPasswd: (state, action) => {
            state.passwd = action.payload.passwd;
        },
        updateAllUserData: (state, action) => {
            return action.payload;
        },

    }
})

export const { updateTheUserInfo, updateTheUserPasswd, updateAllUserData } = infoSlice.actions;

export default infoSlice.reducer;