import { createSlice } from "@reduxjs/toolkit";
import DefaultCollection from './defaultCollection.json'

let initialState = DefaultCollection

const messagesArraySlice = createSlice({
    initialState,
    name: 'messagesArray',
    reducers: {
        updateAfterReading: (state, action) => {
            return [
                ...action.payload
            ];
        },
        addOneMessageCollection: (state, action) => {
            state.push(action.payload);
        },
        addOneMessageToOneCollection: (state, action) => {
            let updated = [];

            state.forEach(collection => {
                if (collection._id === action.payload._id) {
                    updated.push(action.payload);
                } else {
                    updated.push(collection);
                }
            })
            return updated;
        },
        fetchMessageCollectionFromServer: (state, action) => {
            return action.payload;
        },
        updateOneCollection: (state, action) => {
            let updated = [];
            state.forEach(collection => {
                if (collection._id === action.payload._id) {
                    updated.push(action.payload);
                } else {
                    updated.push(collection);
                }
            })
            return updated;
        },
    }
})

export const {
    fetchMessageCollectionFromServer,
    updateAfterReading,
    addOneMessageCollection,
    addOneMessageToOneCollection,
    updateOneCollection
} = messagesArraySlice.actions;

export default messagesArraySlice.reducer;