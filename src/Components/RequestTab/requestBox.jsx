import {
  Cancel,
  CheckCircle,
  ClearRounded,
  ControlPoint,
  Remove,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  ListItem,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../Config/server";
import { SocketContext } from "../../Config/socket";
import { deleteRequestFriend } from "../../Services/Data/requestSlice";

export default function RequestBox({
  id,
  name,
  avatarFileName,
  details,
  collections,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const socket = useContext(SocketContext);

  /*--- Add the user to the user collections --*/
  const acceptHandler = () => {
    const data = {
      details: details,
      _id: user._id,
    };
    socket.emit("ACCEPT_REQUEST", data);
    console.log("acceptehandler", data);

    /*--- And delete from the request --- */
    // dispatch(deleteRequestFriend(id));
  };

  const declineHandler = () => {
    dispatch(deleteRequestFriend(id));
  };
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        bgcolor: "rgba(32, 38, 147)",
        p: 1.5,
        borderRadius: 1,
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
  const dispatch = useDispatch();

  const handleSendRequest = () => {
    const data = {
      _id: id,
      details: {
        _id: user._id,
        lastName: user.lastName,
        firstName: user.firstName,
        avatarFileName: user.avatarFileName,
        email: user.email,
        bio: user.bio,
      },
    };
    console.log("request sent");
    socket.emit("SEND_REQUEST", data);
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        bgcolor: "rgba(32, 38, 147)",
        p: 1.5,
        borderRadius: 1,
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
