import { Avatar, Box, Divider, List, Stack, Typography } from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";
import { baseURL } from "../../Config/server";
import MediaAccordion from "../Accordion";
import MemberAccordion from "../Accordion/MemberAccordion";

export const iconStyle = {
  borderRadius: "50%",
  p: 1,
  backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
  color: "white",
};

export default function MessageDetails() {
  const friendInfo = useSelector((state) => state.friend);
  return (
    <Stack
      sx={{
        pt: 2,
        boxShadow: "0 0 2px rgba(0,0,0,0.3)",
      }}
    >
      <Box
        padding={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
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
        sx={{ height: "100%", overflowY: "scroll" }}
        className="disable-scrollbar"
      >
        <MemberAccordion />

        <Divider variant="inset" component="li" />
        <MediaAccordion />
      </List>
    </Stack>
  );
}
