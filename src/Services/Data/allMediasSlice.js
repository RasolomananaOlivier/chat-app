const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
    {
        _id: 'media1',
        access: ['1', '2'],
        collections: [
            {
                mediaID: '20',
            },
            {
                mediaID: '21',
            },
            {
                mediaID: '22',
            }

        ]
    },
    {
        _id: 'media2',
        access: ['1', '3'],
        collections: [
            {
                mediaID: '30',
            },
            {
                mediaID: '31',
            },
            {
                mediaID: '32',
            }, {
                mediaID: '34'
            },
            {
                mediaID: '35'
            },
            {
                mediaID: '36'
            },
            {
                mediaID: '37'
            }

        ]
    },
    {
        _id: 'media3',
        access: ['1', '4'],
        collections: [
            {
                mediaID: '40',
            },
            {
                mediaID: '41',
            },
            {
                mediaID: '42',
            }

        ]
    },

]

const mediasCollectionsSlice = createSlice({
    initialState,
    name: 'mediasCollections',
    reducers: {
        addOneMedia: (state, action) => {
            state.push(action.payload);
        }
    }
})

export const { addOneMedia } = mediasCollectionsSlice.actions;

export default mediasCollectionsSlice.reducer;