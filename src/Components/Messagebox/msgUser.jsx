import React, { useState } from "react";
import { Box, Paper, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { MessageMenu2 } from "../Menu";
import ModalImageViewer from "../ModalImageViewer";
import { baseURL } from "../../Config/server";
import { AnimatePresence, motion } from "framer-motion";

export default function MessageUser({
  containerRef,
  messageId,
  itemId,
  content,
  type,
  mediaFileName,
  time,
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
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleMouseLeave = () => {
    setClicked(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: 1,
      }}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "start",
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
        <MessageMenu2
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          itemId={itemId}
          messageId={messageId}
        />

        {type === "text" ? (
          <Box>
            <Box
              onClick={handleClick}
              onMouseLeave={handleMouseLeave}
              sx={{
                minWidth: 60,
                maxWidth: 370,
                backgroundColor: "#E5E2E2",
                borderRadius: "10px",
                py: 1,
                px: 1.2,
                cursor: "pointer",
              }}
            >
              {content}
            </Box>
            <AnimatePresence>
              {clicked ? (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  style={{
                    fontSize: 13,
                    color: "#423F3F",
                  }}
                >
                  {time}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Box>
        ) : (
          <>
            <Paper
              elevation={0}
              sx={{ maxWidth: 260, p: 0, m: 0, border: "dotted" }}
            >
              <img
                width={260}
                height="100%"
                src={
                  mediaFileName !== undefined || mediaFileName !== ""
                    ? `${baseURL}/pic/avatar/${mediaFileName}`
                    : null
                }
                alt={itemId}
                style={{
                  borderRadius: "20px",
                }}
                onClick={() => setShowModal(true)}
              />
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
