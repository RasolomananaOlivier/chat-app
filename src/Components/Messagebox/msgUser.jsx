import React, { useEffect, useState } from "react";
import { Box, Paper, Avatar, Slide, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { MessageMenu2 } from "../Menu";

export default function MessageUser({ containerRef, id }) {
  const [mouted, setmouted] = useState(false);
  /* --- Show menu --- */
  const [anchorEl, setAnchorEl] = useState(null);
  /* --- Get the current target of the button --- */
  const showMenu = (e) => {
    console.log(e.currentTarget);
    setAnchorEl(e.currentTarget);
  };
  useEffect(() => {
    setmouted((prev) => !prev);

    return () => {
      setmouted((prev) => !prev);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
      }}
    >
      {/* <Slide
        direction="right"
        in={mouted}
        container={containerRef?.current}
        unmountOnExit
      > */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mr: 1.9,
        }}
      >
        <Box>
          <IconButton onClick={showMenu}>
            <MoreVert sx={{ color: "ThreeDDarkShadow" }} />
          </IconButton>
        </Box>
        {/* Show the message menu */}
        <MessageMenu2 anchorEl={anchorEl} setAnchorEl={setAnchorEl} id={id} />

        <Paper
          elevation={2}
          sx={{
            maxWidth: 370,
            p: 1.5,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum,
          ab.
        </Paper>
        <Avatar
          src="broken"
          alt="you"
          sx={{
            m: 2,
          }}
        />
      </Box>
      {/*  </Slide> */}
    </Box>
  );
}
