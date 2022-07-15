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
import { Communication } from "src/Services/Api/communication";
import { removeNotification } from "../../../Services/Data/notificationSlice";

export default function NotificationBox({ id, content, timeStamp }) {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.user._id)
    const removeHandler = () => {
        Communication.deleteNotification(userId, id)
            .then((result) => {
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
