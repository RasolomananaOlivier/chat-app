import { Cancel } from "@mui/icons-material";
import {
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@mui/material";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotificationFromTheServer } from "src/Services/Api/removeNotification";
import { removeNotification } from "../../Services/Data/notificationSlice";

export default function NotificationBox({ id, content, timeStamp }) {
    const dispatch = useDispatch();
    console.log('notBox :>> ', id);

    const userId = useSelector(state => state.user._id)
    const removeHandler = () => {
        removeNotificationFromTheServer(userId, id)
            .then((result) => {
                console.log('Notification deleted', result);
                dispatch(removeNotification(id));
            })
            .catch(err => console.log(err))

    };
    return (
        <ListItem sx={{ bgcolor: "#2230EA", borderRadius: 3 }}>
            <ListItemText
                primary={
                    <Typography sx={{ color: "whitesmoke" }}>{content}</Typography>
                }
                secondary={
                    <Typography sx={{ color: "InactiveCaptionText" }}>
                        {timeStamp}
                    </Typography>
                }
            />

            <ListItemSecondaryAction>
                <IconButton onClick={removeHandler}>
                    <Cancel color="error" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
