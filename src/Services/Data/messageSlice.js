import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    access: ['1', '2'],
    _id: '1',
    items: [

        {
            _id: '2',
            auth: 'oli2',

            type: 'media',
            mediaId: 'media2',

            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '3',
            auth: 'Olivier Ras',
            type: 'text',
            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '4',
            auth: 'oli2',
            type: 'text',
            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '5',
            auth: 'oli2',
            type: 'text',
            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '6',
            auth: 'oli2',
            type: 'text',
            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '7',
            auth: 'Olivier Ras',
            type: 'text',
            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '8',
            auth: 'oli2',
            type: 'text',
            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '9',
            auth: 'Olivier Ras',
            type: 'text',
            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        }, {
            _id: '10',
            auth: 'Olivier Ras',
            type: 'text',

            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        }, {
            _id: '11',
            auth: 'oli2',
            type: 'text',

            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        }, {
            _id: '12',
            auth: 'Olivier Ras',
            type: 'text',

            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        }, {
            _id: '13',
            auth: 'Olivier Ras',

            type: 'text',

            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '14',
            auth: 'Olivier Ras',

            type: 'media',
            mediaId: 'media2',
            content: 'loremsdfsdfsdsf',
            timeStamp: '2 jan 2022'
        },
        {
            _id: '15',
            auth: 'Joe Doe',
            type: 'media',
            mediaId: 'media2',
            content: 'Again a some interested thino to show',
            timeStamp: '2 jan 2022'
        },
    ],
    more: 5,
    loadAll: false
}

const messageSlice = createSlice({
    initialState,
    name: 'messages',
    reducers: {
        increaseMore: (state, action) => {
            // console.log(state.more, state.items.length);
            if (state.more <= state.items.length) {
                console.log('ok');
                state.more = state.more + 5;
                console.log('after', state.more, state.items.length);
            }
        },
        resetMore: (state, action) => {

            state.more = 5;
        },
        toggleLoadAll: (state, action) => {
            state.loadAll = true;
        },
        deleteOne: (state, action) => {
            const _id = action.payload;
            // console.log(_id);
            state.items = state.items.filter(i => i._id !== _id)
        },
        updateMessageUI: (state, action) => {
            return {
                ...action.payload
            }
        },
        addNewMessage: (state, action) => {
            state.items.push(action.payload);
        }
    }

})

export const { addNewMessage, increaseMore, resetMore, toggleLoadAll, deleteOne, updateMessageUI } = messageSlice.actions

export default messageSlice.reducer;