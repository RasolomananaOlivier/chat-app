import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import messageReducer from "./messages/messageSlice";
import friendsCollectionsReducer from "./friends/friendscollectionsSlice";
import messagesReducer from "./messages/messagesArraySlice";
import mediaReducer from './mediaSlice'
import mediasCollections from "./allMediasSlice";
import friendReducer from "./friends/friendSlice";
import requestSlice from './requestSlice'
import notificationReducer from "./notificationSlice";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
    user: userReducer,
    messages: messageReducer,
    friendsCollections: friendsCollectionsReducer,
    friend: friendReducer,
    messagesArray: messagesReducer,
    medias: mediaReducer,
    mediasCollections: mediasCollections,
    requests: requestSlice,
    notificationsCollection: notificationReducer
})
const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, reducers);


export default configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})