/* eslint-disable array-callback-return */
import {
    Box,
    Avatar,
    IconButton,
    Divider,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { ArrowBackIos, Menu } from "@mui/icons-material";
import MessageUser from "../Components/Box/Messagebox/msgUser";
import MessageFriend from "../Components/Box/Messagebox/mgsFriend";
import SendField from "../Components/Input/SendField";
import { iconsStyleSmall } from "../Components/Navigation/VerticalTabs";
import { useSelector } from "react-redux";

import { baseURL } from "../Config/server";
import { AnimatePresence, motion } from "framer-motion";
import MessageIllustration from "../Assets/img/message.webp";

const messageFriendVariants = {
    hidden: {
        opacity: 0,
        x: -100,
    },
    visible: {
        opacity: 1,
        x: 0,
    },
    exit: { scale: 0, x: -300, transition: { duration: 0.2 } },
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
    exit: { scale: 0, x: 300, opacity: 0, transition: { duration: 0.2 } },
};

export default function Messagelayout({
    handleOpenMessageDetail,
    handleCloseMessage,
}) {
    /* -- Message data from redux -- */
    const MessagesRedux = useSelector((state) => state.messages);
    console.log('MessagesRedux :>> ', MessagesRedux);
    const messageId = MessagesRedux._id;
    const user = useSelector((state) => state.user);

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

    /* -- Get the current friend to render in the ui -- */
    const friendInfo = useSelector((state) => state.friend);

    const showMenu = () => {
        handleOpenMessageDetail();
    };

    /**
     * Get the parent element to make to child slide in it
     */
    const containerRef = React.useRef(null);
    const messageEnd = React.useRef(null);
    const scrollToTheEnd = () => {
        messageEnd.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToTheEnd();
    }, [MessagesRedux]);

    return (
        <Stack
            sx={{
                height: "100%",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pl: 2,
                    pr: 1,
                    py: 1.5,

                }}
            >
                {friendInfo.hasOwnProperty("_id") ? (
                    <Box
                        sx={{
                            display: "flex",

                        }}
                    >
                        {smallScreen && (
                            <IconButton onClick={handleCloseMessage}>
                                <ArrowBackIos />
                            </IconButton>
                        )}
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
                    overflowX: "hidden",
                    overflowY: "scroll",
                    maxHeight: smallScreen ? "calc(100vh - 280px)" : "71vh",
                    py: 2,
                    flexGrow: 1,
                }}
                ref={containerRef}
                className="disable-scrollbar"
            >
                {MessagesRedux?.items?.length === 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <img src={MessageIllustration} alt="mp" />
                        Start sending you message.
                    </Box>
                ) : (
                    <>
                        <AnimatePresence>
                            {MessagesRedux?.items?.map((msg, index) => {
                                let previousMessageAuth, nextMessageAuth;
                                if (index !== 0) {
                                    previousMessageAuth = MessagesRedux.items[index - 1].auth;
                                }
                                if (index !== MessagesRedux.items.length - 1) {
                                    nextMessageAuth = MessagesRedux.items[index + 1].auth;
                                }

                                if (msg.hasCopy?.includes(user._id)) {
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
                                                    itemId={msg._id}
                                                    messageId={messageId}
                                                    type={msg.messageType}
                                                    content={msg.content}
                                                    mediaFileName={msg?.mediaId}
                                                    sameAuth={msg.auth === previousMessageAuth}
                                                    isNextDifferent={msg.auth !== nextMessageAuth}
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
                                                    itemId={msg._id}
                                                    messageId={messageId}
                                                    type={msg.messageType}
                                                    content={msg.content}
                                                    mediaFileName={msg?.mediaId}
                                                    sameAuth={msg.auth === previousMessageAuth}
                                                    isNextDifferent={msg.auth !== nextMessageAuth}
                                                    time={msg.timeStamp}
                                                />
                                            </motion.div>
                                        );
                                    }
                                }
                            })}
                        </AnimatePresence>
                    </>
                )}
                <div ref={messageEnd}></div>
            </Stack>
            <SendField />
        </Stack>
    );
}
