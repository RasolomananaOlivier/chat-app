import { Box, List, Stack } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import NotificationBox from "./notificationBox";
import { motion } from "framer-motion";
import { NotificationsNoneTwoTone } from "@mui/icons-material";

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
    console.log('notifications :>> ', notifications);
    return (
        <List className="disable-scrollbar">
            <Stack spacing={1} color="white">
                <AnimatePresence>
                    {notificationsState.length === 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                position: "relative",
                                top: "20vh",
                            }}
                        >
                            <NotificationsNoneTwoTone fontSize="large" htmlColor="#08AFCC" />
                            <div
                                style={{ textAlign: "center", fontSize: 15, padding: "5px" }}
                            >
                                Your notification should appear here. Stay calm and carry on.
                            </div>
                        </Box>
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
