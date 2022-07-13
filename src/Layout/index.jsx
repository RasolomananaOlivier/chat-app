import React, { useContext, useEffect, useState } from "react";
import SideNavigation from "../Components/Navigation";

import Grid from "@mui/material/Grid";
import { socket, SocketContext } from "../Config/socket";
import Home from "../Pages/Home";
import About from "../Pages/About";
import { useDispatch, useSelector } from "react-redux";
import {
    addOneMessageCollection,
    addOneMessageToOneCollection,
    fetchMessageCollectionFromServer,
} from "../Services/Data/messagesArraySlice";
import { getAllMedias } from "../Services/Api/allmedia";
import { getAllMessage } from "../Services/Api/allmessage";
import {
    addOneMedia,
    addOneMediaIdToOneMediaCollection,
    fetchMediasCollectionsFromTheServer,
} from "../Services/Data/allMediasSlice";
import { fetchNotificationsFromTheServer } from "../Services/Data/notificationSlice";
import {
    addRequestFriend,
    fetchRequestFromTheServer,
} from "../Services/Data/requestSlice";
import { fetchingTheFriendsCollections } from "src/Services/Data/friends/friendscollectionsSlice";
import { addNewMessage, updateMessageUI } from "../Services/Data/messageSlice";
import { updateMedias } from "../Services/Data/mediaSlice";
import SettingLayout from "./settingLayout";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Close from "@mui/icons-material/Close";
import { AppBar, Button } from "@mui/material";
import { updateNickName } from "src/Services/Data/user/userSlice";
import { findOnefriend } from "src/Components/Userbox";
import { updateFriendData } from "src/Services/Data/friends/friendSlice";

function LayoutWithContext() {
    return (
        <SocketContext.Provider value={socket}>
            <Layout />
        </SocketContext.Provider>
    );
}

function Layout() {
    const [value, setValue] = useState(0);
    const [error, setError] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("Disconnected from the server");

    const user = useSelector((state) => state.user);
    const currentMessageId = useSelector(state => state.messages._id)
    const friendCollections = useSelector((state) => state.friendsCollections);
    const userId = user._id;
    const socket = useContext(SocketContext);

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        getAllMessage(userId)
            .then((result) => {
                dispatch(fetchMessageCollectionFromServer(result));
            })
            .catch((err) => {
                console.log(err);
            });
        getAllMedias(userId)
            .then((result) => {
                dispatch(fetchMediasCollectionsFromTheServer(result));
            })
            .catch((err) => {
                console.log(err);
            });

        socket.on("connect", () => {
            console.log("connected ?", socket.connected);
        });

        socket.emit("USER_CONNECTED", userId);

        socket.on(`${user._id}_NEW_NOTIFICATION`, (data, message, media) => {
            console.log("notify", data, message);
            dispatch(fetchNotificationsFromTheServer(data.notificationsCollections));
            dispatch(fetchingTheFriendsCollections(data.friendsCollections));
            dispatch(fetchRequestFromTheServer(data.requests));
            dispatch(addOneMessageCollection(message));
            dispatch(addOneMedia(media));
        });
        socket.on(`${user._id}_NEW_REQUEST`, (requestArray) => {
            dispatch(addRequestFriend(requestArray));
        });
        socket.on("hello", (arg) => {
            console.log("test", arg);
        });

        socket.on(`${user._id}_NEW_FRIEND_ACCEPTED`, (data, message, media) => {
            console.log("accepted request", data, message);
            dispatch(updateNickName(data.nickName));
            dispatch(fetchingTheFriendsCollections(data.friendsCollections));
            dispatch(fetchRequestFromTheServer(data.requests));
            dispatch(addOneMessageCollection(message));
            dispatch(addOneMedia(media));
        });

        socket.on(`${user._id}_NEW_MESSAGE`, (data, mediaData) => {
            const { items } = data;
            // console.log("> media", mediaData);
            // console.log("new message", data);
            dispatch(addOneMessageToOneCollection(data));
            if (mediaData !== null) {
                dispatch(addOneMediaIdToOneMediaCollection(mediaData));
            }

            const localStorageMessages = JSON.parse(
                localStorage.getItem(`messages-${user._id}`)
            );
            // console.log("compare", localStorageMessages._id, data._id);
            if (localStorageMessages._id === data._id) {
                // console.log(data.items[items.length - 1]);
                const payload = data.items[items.length - 1];
                dispatch(addNewMessage(payload));
                if (mediaData !== null) {
                    dispatch(updateMedias(mediaData));
                }
            }
        });

        //`${userId}_NEW_NICKNAME`

        socket.on(`${user._id}_NEW_NICKNAME`, (data) => {
            dispatch(updateNickName(data.newUserNicknameList));
            dispatch(fetchingTheFriendsCollections(data.newUserFriendsCollection))

            if (data.messageId === currentMessageId) {
                const correctFriend = findOnefriend(data.newUserFriendsCollection, data.friendId);
                console.log('correctFriend :>> ', correctFriend);
                dispatch(updateFriendData(correctFriend));
            }

        });

        socket.on("disconnect", () => {
            socket.connect();
        });

        return () => {
            console.log("unmounted");
            socket.close();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (socket.connected) {
            setError(false);
            setOpen(true);
            setMessage("Connected to the server");
        } else {
            setError(true);
            setOpen(true);
            setMessage("Disconnected from the server");
        }
    }, [socket.connected]);



    return (
        <>
            <Grid container columns={16}>
                <AppBar variant="elevation" position="sticky" sx={{ display: { xs: "block", lg: "none" }, }}>
                    <SideNavigation value={value} setValue={setValue} />
                </AppBar>

                <Grid item lg={1} sx={{ display: { xs: "none", lg: 'flex' } }}>
                    <SideNavigation value={value} setValue={setValue} />
                </Grid>
                <Grid item xs={16} lg={15} >
                    {/* <Button onClick={() => socket.emit('test')}>Test</Button> */}
                    {[0, 1, 2].includes(value) ? (
                        <Home value={value} setValue={setValue} />
                    ) : value === 3 ? (
                        <SettingLayout />
                    ) : value === 4 ? (
                        <About />
                    ) : null}
                </Grid>
            </Grid>
            {/*  <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={8000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          severity={error ? "error" : "success"}
          variant="filled"
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar> */}
        </>
    );
}
export default LayoutWithContext;
