import { useEffect, useState } from "react";
import { Box, Paper, Avatar, IconButton } from "@mui/material";

import Slide from "@mui/material/Slide";
import { MoreVert } from "@mui/icons-material";
import { MessageMenu } from "../Menu";

// Image
import Media1 from "./2.jpg";

export default function MessageFriend({ containerRef, id, type }) {
  const [mouted, setmouted] = useState(false);
  /* --- Show to menu more vertical --- */
  const [anchorEl, setAnchorEl] = useState(null);
  /*--- Get the reference ---*/
  const showMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

 

  useEffect(() => {
    setmouted((prev) => !prev);

    return () => {
      setmouted((prev) => !prev);
    };
  }, [mouted]);

  return (
    <Box
      sx={{
        width: 615,
        mt: 2,
      }}
      ref={containerRef}
    >
      {/*  <Slide
        direction="left"
        in={false}
        container={containerRef.current}
        unmountOnExit
      > */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Avatar
          src="broken"
          alt="you"
          sx={{
            m: 2,
          }}
        />
        {type === "text" ? (
          <Paper
            elevation={2}
            sx={{
              maxWidth: 370,
              p: 1.5,
              backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
              color: "white",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatum, Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. A, at. ab.
          </Paper>
        ) : (
          <Paper
            elevation={3}
            sx={{
              maxWidth: 260,
              p: 0.1,

              color: "white",
            }}
          >
            <img width={260} height="100%" src={Media1} alt={id} />;
          </Paper>
        )}

        <Box>
          <IconButton onClick={showMenu}>
            <MoreVert sx={{ color: "ThreeDDarkShadow" }} />
          </IconButton>
        </Box>
        <MessageMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} id={id} />
      </Box>
      {/* </Slide> */}
    </Box>
  );
}
