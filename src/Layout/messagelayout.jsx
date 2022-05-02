import { Box, Avatar, IconButton, Divider, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import AccountMenu from "../Components/Menu";
import { Menu, ReplayOutlined } from "@mui/icons-material";
import MessageUser from "../Components/Messagebox/msgUser";
import MessageFriend from "../Components/Messagebox/mgsFriend";
import SendField from "../Components/SendField";
import { iconsStyleSmall } from "../Components/VerticalTabs";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseMore,
  resetMore,
  toggleLoadAll,
} from "../Services/Data/messageSlice";
import { baseURL } from "../Config/server";

export default function Messagelayout() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  /* Message State */
  const [messages, setmessages] = useState([]);

  /* -- Message data from redux -- */
  const MessagesRedux = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);

  /* -- Get the current friend to render in the ui -- */
  const friendInfo = useSelector((state) => state.friend);

  /* --- Get increse more reducer -- */
  const dispatch = useDispatch();

  /* --- Access the top most message -- */
  const getRecentMessage = useCallback(() => {
    let { items, more, loadAll } = MessagesRedux;
    /* UnderFlow if Messages is empty */
    if (items.length === 0) {
      return "No more message";
    }
    let topFive = [];
    let length = items.length - 1;

    if (more <= length && !loadAll) {
      for (let i = length; i > length - more; i--) {
        topFive.unshift(items[i]);
      }
      // console.log(topFive);
      return topFive;
    } else if (more >= length && !loadAll) {
      dispatch(toggleLoadAll());
      return items;
    } else if (more >= length && loadAll) {
      return "No more message";
    }
    // eslint-disable-next-line
  }, [MessagesRedux]);

  /* Load more message */
  const handleLoadMore = (e) => {
    e.preventDefault();
    dispatch(increaseMore());
    console.log(">After increaase more", MessagesRedux.more);
    const loadedMessages = getRecentMessage();
    // console.log(loadedMessages);
    if (loadedMessages === "No more message") {
      alert(loadedMessages);
    } else {
      setmessages(loadedMessages);
    }
  };

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Get the parent element to make to child slide in it
   */
  const containerRef = React.useRef(null);

  const getRecentMessageAfterChange = useCallback(() => {
    let { items, more, loadAll } = MessagesRedux;
    /* UnderFlow if Messages is empty */
    if (items?.length === 0) {
      return [];
    }
    let topFive = [];
    let length = items.length - 1;

    if (more <= length && !loadAll) {
      for (let i = length; i > length - more; i--) {
        topFive.unshift(items[i]);
      }

      return topFive;
    } else if (more >= length) {
      console.log("items < 5", items);
      dispatch(toggleLoadAll());
      return items;
    }
    // eslint-disable-next-line
  }, [MessagesRedux]);

  /**
   * On Component Mount
   */
  useEffect(() => {
    const loaded = getRecentMessageAfterChange();
    setmessages(loaded);

    // console.log(">Store/friend ", friendInfo.hasOwnProperty("_id"));
    return () => {
      //   console.log("unmount");
      dispatch(resetMore());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log(MessagesItems);
    const loaded = getRecentMessageAfterChange();
    console.log("loaded ", loaded);
    if (loaded !== undefined) {
      setmessages([...loaded]);
    }
  }, [MessagesRedux, getRecentMessageAfterChange]);

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 1,
        }}
      >
        {friendInfo.hasOwnProperty("_id") ? (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Avatar
              src={
                friendInfo.avatarFileName !== ""
                  ? `${baseURL}/pic/avatar/${friendInfo.avatarFileName}`
                  : null
              }
              slt="sdgd"
            />
            <Typography
              sx={{
                ml: 2,
              }}
            >
              {`${friendInfo.lastName} ${friendInfo.firstName}`}
            </Typography>
          </Box>
        ) : (
          <div>NO Friend</div>
        )}

        <IconButton aria-label="chat option" onClick={showMenu}>
          <Menu sx={iconsStyleSmall} />
        </IconButton>
        <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Box>
      <Divider
        sx={{
          width: "93%",
          position: "relative",
          left: 21,
        }}
      />
      <Stack
        sx={{
          height: "72vh",
          width: 635,
          overflowX: "hidden",
          overflowY: "scroll",
          pb: 2,
        }}
        ref={containerRef}
        className="disable-scrollbar"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handleLoadMore}>
            <ReplayOutlined />
          </IconButton>
        </Box>

        {messages?.length === 0 ? (
          <div>Oops,no more messages</div>
        ) : (
          messages?.map((msg, i) => {
            // console.log(msg.auth);
            if (msg.auth === `${user._id}`) {
              return (
                <MessageUser
                  key={i}
                  containerRef={containerRef}
                  id={msg._id}
                  type={msg.messageType}
                  content={msg.content}
                  mediaFileName={msg?.mediaId}
                />
              );
            } else {
              return (
                <MessageFriend
                  key={i}
                  containerRef={containerRef}
                  id={msg._id}
                  type={msg.messageType}
                  content={msg.content}
                  mediaFileName={msg?.mediaId}
                />
              );
            }
          })
        )}
      </Stack>
      <SendField />
    </Stack>
  );
}
