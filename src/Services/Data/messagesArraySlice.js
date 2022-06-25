import { createSlice } from "@reduxjs/toolkit";

let initialState = [
    {
        access: ['1', '2'],
        _id: '100',
        items: [

            {
                _id: '2',
                auth: 'oli2',

                messageType: 'media',
                mediaId: 'media2',

                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '3',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '4',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '5',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '6',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '7',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '8',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '9',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '10',
                auth: '1',
                messageType: 'text',

                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '11',
                auth: 'oli2',
                messageType: 'text',

                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '12',
                auth: '1',
                messageType: 'text',

                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '13',
                auth: '1',

                messageType: 'text',

                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '14',
                auth: '1',

                messageType: 'media',
                mediaId: 'media2',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '15',
                auth: 'oli2',
                messageType: 'media',
                mediaId: 'media2',
                content: 'Again a some interested thino to show',
                timeStamp: '2 jan 2022',

            },
        ],
        more: 5,
        loadAll: false,
        read: false

    },
    {
        access: ['1', '3'],
        _id: '101',
        items: [


            {
                _id: '77',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '87',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '97',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '170',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '171',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '714',
                auth: 'oli2',
                messageType: 'media',
                mediaId: '',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '15',
                auth: 'oli2',
                messageType: 'text',
                content: 'Again a some interested thino to show',
                timeStamp: '2 jan 2022',

            },
        ],
        more: 5,
        loadAll: false,

        read: false
    },
    {
        access: ['1', '4'],
        _id: '102',
        items: [

            {
                _id: '22',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },

            {
                _id: '29',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '210',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '121',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '122',
                auth: '1',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            }, {
                _id: '135',
                auth: '1',
                messageType: 'media',

                mediaId: '',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '154',
                auth: 'oli2',
                messageType: 'text',
                content: 'loremsdfsdfsdsf',
                timeStamp: '2 jan 2022',

            },
            {
                _id: '155',
                auth: 'oli2',
                messageType: 'text',
                content: 'Some interseted thing to display',
                timeStamp: '2 jan 2022',

            },
        ],
        more: 5,
        loadAll: false,

        read: false
    }

]

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