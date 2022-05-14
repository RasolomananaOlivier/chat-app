import { useEffect, useState } from "react";
import { Box, Avatar, IconButton } from "@mui/material";

import { MoreVert } from "@mui/icons-material";
import { MessageMenu } from "../Menu";

// Image
import ModalImageViewer from "../ModalImageViewer";
import { baseURL } from "../../Config/server";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function MessageFriend({
  containerRef,
  id,
  type,
  content,
  mediaFileName,
  sameAuth,
  isNextDifferent,
  time,
}) {
  const [mouted, setmouted] = useState(false);
  const friendInfo = useSelector((state) => state.friend);
  /* --- Show to menu more vertical --- */
  const [anchorEl, setAnchorEl] = useState(null);
  /*--- Get the reference ---*/
  const showMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  /* Show Picture modal */
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setmouted((prev) => !prev);

    return () => {
      setmouted((prev) => !prev);
    };
  }, [mouted]);

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
        width: 615,
        mt: !sameAuth ? 2 : 1,
      }}
      ref={containerRef}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
        }}
      >
        {!sameAuth ? (
          <Box sx={{ pt: 1.3 }}>
            <Avatar
              src={
                friendInfo.avatarFileName !== ""
                  ? `${baseURL}/pic/avatar/${friendInfo.avatarFileName}`
                  : null
              }
              alt="you"
              sx={{
                mx: 2,
                alignSelf: "flex-end",
              }}
            />
          </Box>
        ) : null}

        {type === "text" ? (
          <Box>
            <Box
              onMouseOver={() => setHovered(true)}
              onClick={handleClick}
              onMouseLeave={handleMouseLeave}
              sx={{
                minWidth: 60,
                maxWidth: 370,
                backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
                borderRadius: !sameAuth
                  ? "15px 15px 15px 0"
                  : isNextDifferent
                  ? "0 15px 15px 15px"
                  : "0 15px 15px 0",
                py: 1,
                px: 1.2,
                cursor: "pointer",
                color: "white",
                ml: !sameAuth ? "0" : "4.6rem",
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
                    marginLeft: !sameAuth ? "0" : "4.6rem",
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
            <Box
              sx={{
                maxWidth: 260,
                p: 0,
                ml: !sameAuth ? "0" : "4.6rem",
                color: "white",
                maxHeight: 170,
              }}
            >
              <img
                width={260}
                height={170}
                src={
                  mediaFileName !== undefined || mediaFileName !== ""
                    ? `${baseURL}/pic/avatar/${mediaFileName}`
                    : null
                }
                alt={id}
                style={{
                  borderRadius: "20px",
                }}
                onClick={() => setShowModal(true)}
              />
              ;
            </Box>
            <ModalImageViewer
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              mediaFileName={mediaFileName}
            />
          </>
        )}

        {hovered ? (
          <Box
            sx={{
              alignSelf: type === "text" ? "start" : "start",
            }}
          >
            <IconButton onClick={showMenu}>
              <MoreVert sx={{ color: "ThreeDDarkShadow" }} />
            </IconButton>
          </Box>
        ) : null}

        <MessageMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} id={id} />
      </Box>
    </Box>
  );
}
