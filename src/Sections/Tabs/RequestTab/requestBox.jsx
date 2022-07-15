import { Cancel, CheckCircle, ControlPoint } from "@mui/icons-material";
import {
    Avatar,
    Box,
    ListItemAvatar,
    ListItemText,
    Typography,
    IconButton,
    ListItem,
} from "@mui/material";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { baseURL } from "../../../Config/server";
import { SocketContext } from "../../../Config/socket";

export default function RequestBox({
    name,
    avatarFileName,
    friendData,
}) {
    const user = useSelector((state) => state.user);

    const socket = useContext(SocketContext);

    /*--- Add the user to the user collections --*/
    const acceptHandler = () => {
        const data = {
            friendData,
            _id: user._id,
        };
        console.log('friendData :>> ', friendData);
        socket.emit("ACCEPT_REQUEST", data);
        console.log("acceptehandler", data);

        /*--- And delete from the request --- */
    };

    const declineHandler = () => { };
    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                bgcolor: "rgba(40, 60, 147)",
                p: 1.5,
                borderRadius: 3,
            }}
        >
            <ListItemAvatar>
                <Avatar
                    src={
                        avatarFileName !== ""
                            ? `${baseURL}/pic/avatar/${avatarFileName}`
                            : null
                    }
                    alt={name}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                        color="ButtonHighlight"
                    >
                        {name}
                    </Typography>
                }
            />

            <Box>
                <IconButton aria-label="Refuse" onClick={declineHandler}>
                    <Cancel color="error" />
                </IconButton>
                <IconButton aria-label="Refuse" onClick={acceptHandler}>
                    <CheckCircle color="success" />
                </IconButton>
            </Box>
        </ListItem>
    );
}

export function SuggestionBox({ id, name, avatarFileName, details, email }) {
    const user = useSelector((state) => state.user);
    const socket = useContext(SocketContext);

    const handleSendRequest = () => {
        const data = {
            friendId: id,
            details: {
                _id: user._id,
                lastName: user.lastName,
                firstName: user.firstName,
                avatarFileName: user.avatarFileName,
                email: user.email,
                bio: user.bio,
                nickName: user.nickName
            },
        };
        console.log("request sent");
        socket.emit("SEND_REQUEST", data);
    };

    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                bgcolor: "#2230EA",
                p: 1.5,
                borderRadius: 3,
            }}
        >
            <ListItemAvatar>
                <Avatar
                    src={
                        avatarFileName !== ""
                            ? `${baseURL}/pic/avatar/${avatarFileName}`
                            : null
                    }
                    alt={name}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body1"
                        color="ButtonHighlight"
                    >
                        {name}
                    </Typography>
                }
                secondary={
                    <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                        color="ButtonHighlight"
                    >
                        {email}
                    </Typography>
                }
            />

            <Box>
                <IconButton aria-label="Refuse" onClick={handleSendRequest}>
                    <ControlPoint />
                </IconButton>
            </Box>
        </ListItem>
    );
}
