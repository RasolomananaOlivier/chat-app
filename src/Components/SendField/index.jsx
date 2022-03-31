import { CameraAlt, Send } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { iconsStyleSmall } from "../VerticalTabs";
import { useSelector, useDispatch } from "react-redux";
/* {
    _id: '15',
    auth: 'Joe Doe',
    type: 'media',
    mediaId: 'media2',
    content: 'Again a some interested thino to show',
    timeStamp: '2 jan 2022'
}, */
export default function SendField() {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleTextSender = () => {
    dispatch();
  };
  return (
    <Box
      sx={{
        display: "flex",
        mx: 3,
      }}
    >
      <TextField id="" fullWidth placeholder="Type your message" />
      <IconButton
        sx={{
          pl: 1.5,
        }}
      >
        <CameraAlt sx={iconsStyleSmall} />
      </IconButton>
      <IconButton
        sx={{
          pl: 1.5,
          pr: 2,
        }}
      >
        <Send sx={iconsStyleSmall} />
      </IconButton>
    </Box>
  );
}
