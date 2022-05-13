import { Box, Avatar, IconButton, Divider, Typography } from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";
import AccountMenu from "../Components/Menu";
import { Menu } from "@mui/icons-material";
import MessageUser from "../Components/Messagebox/msgUser";
import MessageFriend from "../Components/Messagebox/mgsFriend";
import SendField from "../Components/SendField";
import { iconsStyleSmall } from "../Components/VerticalTabs";
import { useSelector } from "react-redux";

import { baseURL } from "../Config/server";
import { AnimatePresence, motion } from "framer-motion";

const messageFriendVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: { scale: 0, x: -200, transition: { duration: 0.2 } },
};
const userFriendVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: { scale: 0, x: 200, opacity: 0, transition: { duration: 0.2 } },
};

export default function Messagelayout() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  /* -- Message data from redux -- */
  const MessagesRedux = useSelector((state) => state.messages);
  const user = useSelector((state) => state.user);

  /* -- Get the current friend to render in the ui -- */
  const friendInfo = useSelector((state) => state.friend);

  const showMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Get the parent element to make to child slide in it
   */
  const containerRef = React.useRef(null);

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
        {MessagesRedux.items.length === 0 ? (
          <div>Oops,no more messages</div>
        ) : (
          <AnimatePresence>
            {MessagesRedux.items.map((msg, index) => {
              let previousMessageAuth;
              if (index !== 0) {
                previousMessageAuth = MessagesRedux.items[index - 1].auth;
              }

              /**
               * TODO: Remove it
               */
              if (msg.auth === `${user._id}`) {
                return (
                  <motion.div
                    key={msg._id}
                    variants={userFriendVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <MessageUser
                      containerRef={containerRef}
                      id={msg._id}
                      type={msg.messageType}
                      content={msg.content}
                      mediaFileName={msg?.mediaId}
                      sameAuth={msg.auth === previousMessageAuth}
                      time={msg.timeStamp}
                    />
                  </motion.div>
                );
              } else {
                return (
                  <motion.div
                    key={msg._id}
                    variants={messageFriendVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <MessageFriend
                      containerRef={containerRef}
                      id={msg._id}
                      type={msg.messageType}
                      content={msg.content}
                      mediaFileName={msg?.mediaId}
                      sameAuth={msg.auth === previousMessageAuth}
                      time={msg.timeStamp}
                    />
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        )}
      </Stack>
      <SendField />
    </Stack>
  );
}
