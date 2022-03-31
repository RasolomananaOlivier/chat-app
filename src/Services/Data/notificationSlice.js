import { createSlice } from "@reduxjs/toolkit";

let initialState = [
    {
        _id: '50',
        content: 'Avatar 1 had accepted your request',
        timeStamp: '2 mars 2022'
    },
    {
        _id: '51',
        content: 'Try our product fro free , Company name',
        timeStamp: '2 mars 2022'
    },
    {
        _id: '52',
        content: 'Avatar 1 had accepted your request',
        timeStamp: '2 mars 2022'
    },
    {
        _id: '53',
        content: 'We offer you something special , Company name',
        timeStamp: '2 mars 2022'
    }
]

const notificationSlice = createSlice({
    initialState,
    name: 'notificationsCollection',
    reducers: {
        removeNotification: (state,action) => {
            let updated = []
            state.forEach(notification => {
                if(notification._id !== action.payload){
                    updated.push(notification)
                }
            })
            return updated;
        }
    }

})

export const { removeNotification } = notificationSlice.actions

export default notificationSlice.reducer;