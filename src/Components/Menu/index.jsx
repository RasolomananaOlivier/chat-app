import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { deleteOne } from "../../Services/Data/messageSlice";
import { deleteHasCopy } from "src/Services/Api/allmessage";
import { updateOneCollection } from "src/Services/Data/messagesArraySlice";

export function MessageMenu2({ anchorEl, setAnchorEl, itemId, messageId }) {
  const open = Boolean(anchorEl);
  const userId = useSelector((state) => state.user._id);

  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async () => {
    const messageUpdated = await deleteHasCopy({ messageId, itemId, userId });
    dispatch(updateOneCollection(messageUpdated));
    dispatch(deleteOne(itemId));
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.25))",

          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 10,
            right: -5,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
    >
      <MenuItem onClick={handleRemove}>Remove</MenuItem>
    </Menu>
  );
}

export function MessageMenu({ anchorEl, setAnchorEl, itemId, messageId }) {
  const open = Boolean(anchorEl);
  const userId = useSelector((state) => state.user._id);

  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async () => {
    // console.log("handleRemove clicked");
    const messageUpdated = await deleteHasCopy({ messageId, itemId, userId });
    // console.log(messageUpdated);
    dispatch(updateOneCollection(messageUpdated));
    dispatch(deleteOne(itemId));
    setAnchorEl(null);
  };
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.25))",

          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 10,
            right: 75, //14
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <MenuItem onClick={handleRemove}>Delete</MenuItem>
    </Menu>
  );
}

export default function AccountMenu({ anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <Avatar /> Profile
      </MenuItem>
      <MenuItem>
        <Avatar /> My account
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}
