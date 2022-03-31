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

export default configureStore({
    reducer: {
        user: userReducer,
        messages: messageReducer,
        friendsCollections: friendsCollectionsReducer,
        friend: friendReducer,
        messagesArray: messagesReducer,
        medias: mediaReducer,
        mediasCollections: mediasCollections,
        requests: requestSlice,
        notificationsCollection: notificationReducer
    }
})