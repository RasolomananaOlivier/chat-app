import { Cancel, CheckCircle, ClearRounded, Remove } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  ListItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewFriend } from "../../Services/Data/friendscollectionsSlice";
import { deleteRequestFriend } from "../../Services/Data/requestSlice";

export default function RequestBox({ id, name, details, collections }) {
  const dispatch = useDispatch();

  /*--- Add the user to the user collections --*/
  const acceptHandler = () => {
    dispatch(addNewFriend(details));

    /*--- And delete from the request --- */
    dispatch(deleteRequestFriend(id));
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
        <Avatar src={"sfs"} alt={name} />
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
