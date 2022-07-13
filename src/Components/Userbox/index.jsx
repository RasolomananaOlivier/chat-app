import { useEffect, useMemo, useState } from "react";

import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";
import {
    Badge,
    Divider,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateMessageUI } from "../../Services/Data/messageSlice";
import { updateMedias } from "../../Services/Data/mediaSlice";
import { updateFriendData } from "../../Services/Data/friends/friendSlice";
import { updateAfterReading } from "../../Services/Data/messagesArraySlice";

import { baseURL } from "../../Config/server";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        width: 10,
        height: 10,
        backgroundColor: "#44b700",
        color: "#44b700",
        borderRadius: "50%",
        boxShadow: `0 0 0 2px rgba(255,255,255,0.2)`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2)",
            opacity: 0,
        },
    },
}));
const StyledBadgeOffline = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        width: 10,
        height: 10,
        backgroundColor: "#B70015",
        color: "#B7001B",
        borderRadius: "50%",
        boxShadow: `0 0 0 2px rgba(255,255,255,0.2)`,
    },
}));

export default function Userbox({
    active,
    name,
    id,
    avatarFileName,
    online,
    handleOpenMessage,
}) {
    const [myLastMessage, setMyLastMessage] = useState(null);

    const listMessages = useSelector((state) => state.messagesArray);
    const mediasCollections = useSelector((state) => state.mediasCollections);
    const friendCollections = useSelector((state) => state.friendsCollections);
    const infoUser = useSelector((state) => state.user);

    /**
     * Return the message having the id param
     * Or undefined if not
     */
    const messageHavingTheId = useMemo(() => {
        return findOne(listMessages, id);
        // eslint-disable-next-line
    }, [listMessages]);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();

        /**
         * Find the message relative to the id
         * And update the messages store
         */
        console.log('listMessages :>> ', listMessages, id);
        const result = findOne(listMessages, id);
        dispatch(updateMessageUI(result));
        /* if (result !== undefined) {
          dispatch(updateMessageUI(result));
        } else {
          dispatch(updateMessageUI(result));
          
        } */

        /**
         * Find the media relative to the id
         * And update the medias store
         */
        const correctMedia = findOneMedia(mediasCollections, id);
        if (correctMedia !== undefined) {
            dispatch(updateMedias(correctMedia));
        } else {
            console.log(">correct media ", correctMedia);
        }

        /**
         * Find the friend info from the collection
         * And update the friend store
         */
        const correctFriend = findOnefriend(friendCollections, id);
        dispatch(updateFriendData(correctFriend));

        /**
         * Change the read property of the massage to true
         * result._id is the _id of the message being click
         */
        if (result !== undefined) {
            const readMessageUpdated = findOneAndReadMessage(
                listMessages,
                result._id
            );
            dispatch(updateAfterReading(readMessageUpdated));
        }
        handleOpenMessage();
    };

    useEffect(() => {
        if (messageHavingTheId !== undefined) {
            console.log(">2nd accepted", messageHavingTheId);
            const { items } = messageHavingTheId;
            const lastMessage = items[items.length - 1];
            setMyLastMessage(lastMessage?.content);
        }
    }, [messageHavingTheId]);

    console.log("online??", online);
    return (
        <>
            <ListItemButton
                alignItems="flex-start"
                sx={{
                    backgroundImage: active
                        ? "linear-gradient(60deg,#ed1845, #22a6df)"
                        : null,
                    bgcolor: "rgba(32, 38, 147)",
                    borderRadius: 3,
                    mb: 1,
                }}
                onClick={handleClick}
            >
                <ListItemAvatar>
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar
                                src={
                                    avatarFileName !== ""
                                        ? `${baseURL}/pic/avatar/${avatarFileName}`
                                        : null
                                }
                                alt={name}
                            />
                        </StyledBadge>
                    ) : (
                        <StyledBadgeOffline
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar
                                src={
                                    avatarFileName !== ""
                                        ? `${baseURL}/pic/avatar/${avatarFileName}`
                                        : null
                                }
                                alt={name}
                            />
                        </StyledBadgeOffline>
                    )}
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography
                            sx={{ display: "block", color: active ? "#fff" : "whitesmoke" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {name}
                        </Typography>
                    }
                    secondary={
                        <>
                            <Typography
                                sx={{
                                    display: "block",
                                    color: messageHavingTheId?.read ? "#b0b0b0" : "#f9f9f9",
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                <div className="last-message">{myLastMessage}</div>
                            </Typography>
                        </>
                    }
                />
            </ListItemButton>
            <Divider variant="inset" component="li" />
        </>
    );
}

/**
 *
 * @param {messages collections} arr
 * @param {id of the use} id
 * @returns The object message that have accessible by the user having 'id
 */
function findOne(arr, id) {
    const result = arr.find((i) => {
        return i.access.some((_id) => _id === id);
    });
    //   console.log(">find", result);
    return result;
}

/**
 *
 * @param {[]} collections  array of Collections medias
 * @param {string} id Id of the user
 * @returns The object media accessible by the user having 'id'
 */
function findOneMedia(collections, id) {
    const result = collections.find((item) => {
        // console.log(item.access);
        return item.access.some((_id) => _id === id);
    });
    return result;
}

export function findOnefriend(collectionOfFriend, id) {
    return collectionOfFriend.find((friend) => friend._id === id);
}

function findOneAndReadMessage(messageCollection, messageId) {
    let updated = [];
    messageCollection.forEach((message) => {
        if (message._id === messageId) {
            updated.push({
                ...message,
                read: true,
            });
        } else {
            updated.push(message);
        }
    });

    return updated;
}
