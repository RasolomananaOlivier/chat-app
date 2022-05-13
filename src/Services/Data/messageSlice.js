import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  access: ['1', '2'],
  _id: '1',
  items: [

    {
      _id: '21',
      auth: 'oli2',

      messageType: 'media',
      mediaId: '',

      content: 'loremsdfsdfsdsf',
      timeStamp: '2 jan 2022'
    },

    {
      _id: '22',
      auth: 'oli2',
      messageType: 'text',
      content: 'loremsdfsdfsdsf',
      timeStamp: '2 jan 2022'
    },
    {
      _id: '23',
      auth: 'oli2',
      messageType: 'text',
      content: 'loremsdfsdfsdsf',
      timeStamp: '2 jan 2022'
    },
    {
      _id: '24',
      auth: '1',
      messageType: 'text',
      content: 'loremsdfsdfsdsf',
      timeStamp: '2 jan 2022'
    },
    {
      _id: '25',
      auth: 'oli2',
      messageType: 'text',
      content: 'loremsdfsdfsdsf',
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