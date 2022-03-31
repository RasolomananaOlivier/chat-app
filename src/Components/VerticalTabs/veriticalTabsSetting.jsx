import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Logout, CoPresent, Palette, VerifiedUser } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { borderLeft, style } from "@mui/system";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabsSetting({ setheader }) {
  /*-- Navigation 0 to 3 ---*/
  const [value, setValue] = React.useState(0);
  /* --- Access to the current url path --*/
  let location = useLocation();
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    if (newValue === 0) {
      navigate("/home/setting");
      setheader("Manage your account");
    } else if (newValue === 1) {
      navigate("/home/setting/security");
      setheader("Make it secure");
    } else if (newValue === 2) {
      navigate("/home/setting/preference");
      setheader("The app is yours");
    } else {
      navigate("/home/setting/other");
      setheader("Oops , Don t header");
    }
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    if (location.pathname === "/home/setting") {
      setValue(0);
    } else if (location.pathname === "/home/setting/security") {
      setValue(1);
    } else if (location.pathname === "/home/setting/preference") {
      setValue(2);
    } else {
      setValue(3);
    }
  }, [location]);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderLeft: 0, borderColor: "divider", width: "100%" }}
          TabIndicatorProps={{
            style: {
              left: 1,
            },
          }}
        >
          <Tab
            sx={{
              display: "flex",
              fontSize: 13,

              justifyContent: "start",
            }}
            icon={<CoPresent />}
            iconPosition="start"
            label="Account"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              display: "flex",
              fontSize: 13,

              justifyContent: "start",
            }}
            icon={<VerifiedUser />}
            iconPosition="start"
            label="Security"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              display: "flex",
              fontSize: 13,

              justifyContent: "start",
            }}
            icon={<Palette />}
            iconPosition="start"
            label="Preference"
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              display: "flex",
              fontSize: 13,

              justifyContent: "start",
            }}
            icon={<Logout />}
            iconPosition="start"
            label="Other"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
    </>
  );
}
