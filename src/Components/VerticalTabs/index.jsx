import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Announcement,
  Chat,
  ChatBubble,
  Home,
  Logout,
  Settings,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import AlertDialog from "../AlertDialog";

export const iconsStyleSmall = {
  borderRadius: "50%",
  fontSize: 18,
  p: 0.7,
  backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
  color: "white",
};

const iconsStyleSmallNav = {
  borderRadius: "50%",
  fontSize: 24,

  color: "white",
};
const iconsStyleSmallNav2 = {
  borderRadius: "50%",
  fontSize: 24,
  color: "#d9e0e0",
};
const iconsStyleSmallNav2Active = {
  borderRadius: "50%",
  fontSize: 24,
  color: "black",
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  /*-- Navigation 0 to 3 ---*/
  const [value, setValue] = React.useState(0);
  /* --- Access to the current url path --*/
  let location = useLocation();
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    if (newValue === 0) {
      navigate("/home");
    } else if (newValue === 1) {
      navigate("/home/setting");
    } else if (newValue === 2) {
      navigate("/home/about");
    }
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    if (location.pathname === "/home") {
      setValue(0);
    } else if (location.pathname === "/home/setting") {
      setValue(1);
    } else if (location.pathname === "/home/about") {
      setValue(2);
    }
  }, [location]);

  /* Show dialog */
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue(0);
    navigate("/home");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,

        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#ed1545",
          },
        }}
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderLeft: 0,
          borderColor: "divider",
          width: "100%",
          ".MuiTabs-indicator": {
            left: 1,
          },
        }}
      >
        <Tab
          sx={{
            display: "flex",
            fontSize: 13,
            bgcolor: value === 0 ? "#1a1d78" : null,
            justifyContent: "center",
          }}
          icon={
            <Chat sx={value === 0 ? iconsStyleSmallNav : iconsStyleSmallNav2} />
          }
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            display: "flex",
            fontSize: 13,
            bgcolor: value === 1 ? "#1a1d78" : null,
            justifyContent: "center",
          }}
          icon={
            <Settings
              sx={value === 1 ? iconsStyleSmallNav : iconsStyleSmallNav2}
            />
          }
          iconPosition="start"
          {...a11yProps(1)}
        />
        <Tab
          sx={{
            display: "flex",
            fontSize: 13,
            bgcolor: value === 2 ? "#1a1d78" : null,
            justifyContent: "center",
          }}
          icon={
            <Announcement
              sx={value === 2 ? iconsStyleSmallNav : iconsStyleSmallNav2}
            />
          }
          iconPosition="start"
          {...a11yProps(2)}
        />
        <Tab
          sx={{
            display: "flex",
            fontSize: 13,
            bgcolor: value === 3 ? "#1a1d78" : null,
            justifyContent: "center",
          }}
          icon={
            <Logout
              sx={value === 3 ? iconsStyleSmallNav : iconsStyleSmallNav2}
            />
          }
          iconPosition="start"
          onClick={handleClickOpen}
          {...a11yProps(3)}
        />
        <AlertDialog open={open} handleClose={handleClose} />
      </Tabs>
    </Box>
  );
}
