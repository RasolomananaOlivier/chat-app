import { createSlice } from "@reduxjs/toolkit";
import defaultUser from 'src/Services/Data/user/default.json'

let initialState = defaultUser;

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
        updatepseudos: (state, action) => {
            console.log('payload :>> ', action.payload);
            state.pseudos = action.payload;
        }
    }
})

export const { updateTheUserInfo, updateTheUserPasswd, updateAllUserData, updatepseudos } = infoSlice.actions;

export default infoSlice.reducer;