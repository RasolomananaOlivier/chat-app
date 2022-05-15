import { List, Stack } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import NotificationBox from "./notificationBox";
import { motion } from "framer-motion";

const listVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: { scale: 0, transition: { duration: 0.2 } },
};

export default function NotificationTab() {
  const notifications = useSelector((state) => state.notificationsCollection);
  const notificationsState = useMemo(() => notifications, [notifications]);

  return (
    <List className="disable-scrollbar">
      <Stack spacing={1}>
        <AnimatePresence>
          {notificationsState.length === 0 ? (
            <div>No more notification</div>
          ) : (
            notificationsState.map((notification) => {
              return (
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={notification._id}
                >
                  <NotificationBox
                    id={notification._id}
                    content={notification.content}
                    timeStamp={notification.timeStamp}
                  />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </Stack>
    </List>
  );
}
