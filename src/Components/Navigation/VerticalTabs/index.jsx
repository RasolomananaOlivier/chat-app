import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
    Info,
    ExitToApp,
    ChatBubble,
    NotificationsActive,
    PersonAddAlt1,
    Settings,
    Group,
} from "@mui/icons-material";
import { Badge, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import AlertDialog from "src/Components/Displays/AlertDialog";

export const iconsStyleSmall = {
    borderRadius: "50%",
    fontSize: 20,
    p: 0.7,
    backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
    color: "white",
};

const iconsStyleSmallNav2 = {
    borderRadius: "50%",
    fontSize: 24,
    color: "#d9e0e0",
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs({ value, setValue }) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleChange = (event, newValue) => {
        event.preventDefault();
        if (newValue !== 6) {
            setValue(newValue);
        }
    };

    /* Show dialog */
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* --- Get the messages array -- */
    const messagesArray = useSelector((state) => state.messagesArray);
    /* --- Get request Collections --*/
    const requestCollections = useSelector((state) => state.requests);
    /* --- Get Notifications collections ***/
    const notifications = useSelector((state) => state.notificationsCollection);

    const unreadMessages = React.useMemo(() => {
        return countUnreadMessage(messagesArray);
    }, [messagesArray]);

    return (
        <Box
            sx={{
                flexGrow: 0,
                display: "flex",
                width: "100%",
                justifyContent: { xs: "start", sm: "center" },
                alignItems: { xs: "start", sm: "center" },
            }}
        >
            <Tabs
                orientation={mobile ? "horizontal" : "vertical"}
                variant={mobile ? "scrollable" : "standard"}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#ed1545",
                    },
                }}
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderLeft: 0,
                    borderColor: "divider",
                    ".MuiTabs-indicator": {
                        display: "none",
                    },
                }}
            >
                <Tab
                    sx={{
                        display: "flex",
                        fontSize: 13,

                        justifyContent: "center",
                    }}
                    icon={
                        <Badge badgeContent={unreadMessages.length} max={99} color="error">
                            <ChatBubble
                                sx={value === 0 ? iconsStyleSmall : iconsStyleSmallNav2}
                            />
                        </Badge>
                    }
                    iconPosition="start"
                    {...a11yProps(0)}
                />
                <Tab
                    sx={{
                        display: "flex",
                        fontSize: 13,

                        justifyContent: "center",
                    }}
                    icon={
                        <Badge /* badgeContent={unreadMessages.length} max={99} */ color="error">
                            <Group
                                sx={value === 1 ? iconsStyleSmall : iconsStyleSmallNav2}
                            />
                        </Badge>
                    }
                    iconPosition="start"
                    {...a11yProps(0)}
                />
                <Tab
                    sx={{
                        display: "flex",
                        fontSize: 13,

                        justifyContent: "center",
                    }}
                    icon={
                        <Badge
                            badgeContent={requestCollections.length}
                            max={99}
                            color="error"
                        >
                            <PersonAddAlt1
                                sx={value === 2 ? iconsStyleSmall : iconsStyleSmallNav2}
                            />
                        </Badge>
                    }
                    iconPosition="start"
                    {...a11yProps(0)}
                />
                <Tab
                    sx={{
                        display: "flex",
                        fontSize: 13,
                        justifyContent: "center",
                    }}
                    icon={
                        <Badge color="error" badgeContent={notifications.length} max={99}>
                            <NotificationsActive
                                sx={value === 3 ? iconsStyleSmall : iconsStyleSmallNav2}
                            />
                        </Badge>
                    }
                    iconPosition="start"
                    {...a11yProps(0)}
                />
                <Tab
                    sx={{
                        display: "flex",
                        fontSize: 13,

                        justifyContent: "center",
                    }}
                    icon={
                        <Settings
                            sx={value === 4 ? iconsStyleSmall : iconsStyleSmallNav2}
                        />
                    }
                    iconPosition="start"
                    {...a11yProps(1)}
                />
                <Tab
                    sx={{
                        display: "flex",
                        fontSize: 13,

                        justifyContent: "center",
                    }}
                    icon={
                        <Info sx={value === 5 ? iconsStyleSmall : iconsStyleSmallNav2} />
                    }
                    iconPosition="start"
                    {...a11yProps(2)}
                />

                <Tab
                    sx={{
                        display: "flex",
                        fontSize: 13,
                        justifyContent: "center",

                    }}
                    icon={
                        <ExitToApp
                            sx={value === 6 ? iconsStyleSmall : iconsStyleSmallNav2}
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
function countUnreadMessage(messagesArray) {
    let count = [];
    messagesArray.forEach((msg) => {
        if (!msg.read) {
            count.push(msg);
        }
    });
    return count;
}

