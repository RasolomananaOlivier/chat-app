import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MailIcon from "@mui/icons-material/Mail";
import { Badge } from "@mui/material";
import { iconsStyleSmall } from "../VerticalTabs";
import { useSelector } from "react-redux";
import { NotificationImportant, PersonAddAlt1 } from "@mui/icons-material";

const inativeButton = {
  borderRadius: "50%",
  fontSize: 18,
  p: 0.7,

  color: "rgb(201, 201, 201)",
};

export default function IconLabelTabs({ setValue, value }) {
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  /* --- Get request Collections --*/
  const requestCollections = useSelector((state) => state.requests);
  /* --- Get Notifications collections ***/
  const notifications = useSelector((state) => state.notificationsCollection);

  /* --- Get the messages array -- */
  const messagesArray = useSelector((state) => state.messagesArray);

  const unreadMessages = React.useMemo(() => {
    let count = [];
    messagesArray.forEach((msg) => {
      if (!msg.read) {
        console.log(msg);
        count.push(msg);
      }
    });
    return count;
  }, [messagesArray]);

  console.log(unreadMessages);

  return (
    <Tabs
      value={value}
      centered
      onChange={handleChange}
      aria-label="icon label tabs example"
    >
      <Tab
        icon={
          <Badge badgeContent={unreadMessages.length} max={99} color="error">
            <MailIcon sx={value === 0 ? iconsStyleSmall : inativeButton} />
          </Badge>
        }
      />
      <Tab
        icon={
          <Badge
            badgeContent={requestCollections.length}
            max={99}
            color="error"
          >
            <PersonAddAlt1 sx={value === 1 ? iconsStyleSmall : inativeButton} />
          </Badge>
        }
      />
      <Tab
        icon={
          <Badge color="error" badgeContent={notifications.length} max={99}>
            <NotificationImportant
              sx={value === 2 ? iconsStyleSmall : inativeButton}
            />
          </Badge>
        }
      />
    </Tabs>
  );
}
