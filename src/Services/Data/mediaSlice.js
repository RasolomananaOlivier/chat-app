const { createSlice } = require("@reduxjs/toolkit");

const initialState =
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
}


const mediaSlice = createSlice({
    initialState,
    name: 'medias',
    reducers: {
        updateMedias: (state, action) => {
            return {
                ...action.payload
            }
        }
    }
})

export const { updateMedias } = mediaSlice.actions

export default mediaSlice.reducer;
