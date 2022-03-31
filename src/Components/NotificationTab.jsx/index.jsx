import { List, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import NotificationBox from "./notificationBox";

export default function NotificationTab() {
  const notifications = useSelector((state) => state.notificationsCollection);

  return (
    <List sx={{ height: "100%" }} className="disable-scrollbar">
      <Stack spacing={1}>
        {notifications.length === 0 ? (
          <div>No more notification</div>
        ) : (
          notifications.map((notification) => {
            return (
              <NotificationBox
                id={notification._id}
                content={notification.content}
                timeStamp={notification.timeStamp}
              />
            );
          })
        )}
      </Stack>
    </List>
  );
}
