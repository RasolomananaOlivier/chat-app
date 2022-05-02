import { configureStore } from "@reduxjs/toolkit";
import userReducer from './infoSlice'
import messageReducer from "./messageSlice";
import friendsCollectionsReducer from "./friendscollectionsSlice";
import messagesReducer from "./messagesArraySlice";
import mediaReducer from './mediaSlice'
import mediasCollections from "./allMediasSlice";
import friendReducer from "./friendSlice";
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