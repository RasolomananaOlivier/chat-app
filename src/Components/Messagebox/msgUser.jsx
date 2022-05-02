import React, { useState } from "react";
import { Box, Paper, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { MessageMenu2 } from "../Menu";
import ModalImageViewer from "../ModalImageViewer";
import { baseURL } from "../../Config/server";

export default function MessageUser({
  containerRef,
  id,
  content,
  type,
  mediaFileName,
}) {
  /* --- Show menu --- */
  const [anchorEl, setAnchorEl] = useState(null);

  /* Show Picture modal */
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  /* --- Get the current target of the button --- */
  const showMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
      }}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mr: 1.9,
        }}
      >
        {hovered ? (
          <Box>
            <IconButton onClick={showMenu}>
              <MoreVert sx={{ color: "ThreeDDarkShadow" }} />
            </IconButton>
          </Box>
        ) : null}

        {/* Show the message menu */}
        <MessageMenu2 anchorEl={anchorEl} setAnchorEl={setAnchorEl} id={id} />

        {type === "text" ? (
          <Paper
            elevation={0}
            sx={{
              maxWidth: 370,

              p: 1.5,
            }}
          >
            {content}
          </Paper>
        ) : (
          <>
            <Paper
              elevation={0}
              sx={{
                maxWidth: 260,
                p: 0,

                color: "white",
              }}
            >
              <img
                width={260}
                height="100%"
                src={
                  mediaFileName !== undefined || mediaFileName !== ""
                    ? `${baseURL}/pic/avatar/${mediaFileName}`
                    : null
                }
                alt={id}
                onClick={() => setShowModal(true)}
              />
              ;
            </Paper>
            <ModalImageViewer
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              mediaFileName={mediaFileName}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
