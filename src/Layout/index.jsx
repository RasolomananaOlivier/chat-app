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
import { fetchingTheFriendsCollections } from "../Services/Data/friendscollectionsSlice";
import { addNewMessage } from "../Services/Data/messageSlice";
import { updateMedias } from "../Services/Data/mediaSlice";
import SettingLayout from "./settingLayout";

function LayoutWithContext() {
  return (
    <SocketContext.Provider value={socket}>
      {" "}
      <Layout />{" "}
    </SocketContext.Provider>
  );
}

function Layout() {
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const socket = useContext(SocketContext);

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

    socket.on("disconnect", () => {
      socket.connect();
    });

    return () => {
      console.log("unmounted");
      socket.close();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container columns={16}>
      <Grid item lg={1} /* sx={{ border: "1px solid black" }} */>
        <SideNavigation value={value} setValue={setValue} />
      </Grid>
      <Grid item lg={15} /* sx={{ border: "1px solid black" }} */>
        {[0, 1, 2].includes(value) ? (
          <Home value={value} setValue={setValue} />
        ) : value === 3 ? (
          <SettingLayout />
        ) : value === 4 ? (
          <About />
        ) : null}
      </Grid>
    </Grid>
  );
}
export default LayoutWithContext;
