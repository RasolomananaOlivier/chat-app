import { Delete } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    ListItemButton,
    ListItemIcon,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Messages } from "src/Services/Api/messages";
import { updateOneMedia } from "src/Services/Data/allMediasSlice";
import { updateMedias } from "src/Services/Data/mediaSlice";
import { updateOneCollection } from "src/Services/Data/messages/messagesArraySlice";
import { updateMessageUI } from "src/Services/Data/messages/messageSlice";
import { iconsStyleSmall } from "../../Components/Navigation/VerticalTabs";

const Dialogue = ({ handleClose, handleRemove, open }) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{
                        p: 2,
                    }}
                >
                    Delete this conversation ?
                </DialogTitle>
                <DialogActions
                    sx={{
                        p: 2,
                    }}
                >
                    <Button onClick={handleRemove}>Yes, of course </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                            backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
                        }}
                        autoFocus
                    >
                        No, I don't think
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export const ItemButtonDeleteMessage = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const messageId = useSelector((state) => state.messages._id);
    const mediaId = useSelector((state) => state.medias._id);

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = async () => {
        const { message, media } = await Messages.deleteMany({
            messageId,
            userId,
            mediaId,
        });
        dispatch(updateMedias(media));
        dispatch(updateOneMedia(media));
        dispatch(updateMessageUI(message));
        dispatch(updateOneCollection(message));
        setOpen(false);
    };

    return (
        <>
            <ListItemButton sx={{ px: 4, py: 2 }} onClick={() => setOpen(true)}>
                <ListItemIcon>
                    <Delete sx={iconsStyleSmall} />
                </ListItemIcon>
                <Typography
                    sx={{ display: "block" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    Delete this conversation
                </Typography>
            </ListItemButton>
            <Dialogue
                open={open}
                handleClose={handleClose}
                handleRemove={handleRemove}
            />
        </>
    );
};
