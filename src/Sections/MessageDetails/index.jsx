import { ArrowBackIos } from "@mui/icons-material";
import {
    Avatar,
    Box,
    IconButton,
    List,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";
import { baseURL } from "../../Config/server";
import MediaAccordion from "../../Components/Displays/Accordion";
import MemberAccordion from "../../Components/Displays/Accordion/MemberAccordion";
import { ItemButtonDeleteMessage } from "./ItemButton";

export const iconStyle = {
    borderRadius: "50%",
    p: 1,
    backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
    color: "white",
};

export default function MessageDetails({ handleCloseMessageDetail }) {
    const friendInfo = useSelector((state) => state.friend);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            {smallScreen && (
                <Box display="flex">
                    <IconButton onClick={() => handleCloseMessageDetail()}>
                        <ArrowBackIos />
                    </IconButton>{" "}
                </Box>
            )}
            <Stack
                sx={{
                    boxShadow: "0 0 2px rgba(0,0,0,0.3)",
                    height: "100%",
                    width: { xs: "100vw", lg: "auto" },
                }}
            >
                <Box
                    padding={2}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: 1,
                    }}
                >
                    <Avatar
                        src={
                            friendInfo.avatarFileName !== ""
                                ? `${baseURL}/pic/avatar/${friendInfo.avatarFileName}`
                                : null
                        }
                        alt={
                            friendInfo.hasOwnProperty("lastName")
                                ? `${friendInfo.lastName} ${friendInfo.firstName}`
                                : "NO friend"
                        }
                        sx={{
                            width: 100,
                            height: 100,
                            mb: 1,
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        {friendInfo.hasOwnProperty("lastName")
                            ? `${friendInfo.lastName} ${friendInfo.firstName}`
                            : "NO friend"}
                    </Typography>
                    <Typography color="gray">
                        {friendInfo.hasOwnProperty("email") ? `${friendInfo.email} ` : null}
                    </Typography>
                </Box>
                <List
                    sx={{
                        height: "65.5vh",
                        overflowY: "scroll" /*  border: "1px solid red" */,
                    }}
                    className="disable-scrollbar"
                >
                    <MemberAccordion />

                    <MediaAccordion />

                    <ItemButtonDeleteMessage />
                </List>
            </Stack>
        </>
    );
}
