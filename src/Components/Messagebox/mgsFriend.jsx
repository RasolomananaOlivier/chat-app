import { useEffect, useState } from "react";
import { Box, Paper, Avatar, IconButton } from "@mui/material";

import { MoreVert } from "@mui/icons-material";
import { MessageMenu } from "../Menu";

// Image
import ModalImageViewer from "../ModalImageViewer";
import { baseURL } from "../../Config/server";
import { useSelector } from "react-redux";

export default function MessageFriend({
  containerRef,
  id,
  type,
  content,
  mediaFileName,
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
  return (
    <Box
      sx={{
        width: 615,
        mt: 2,
      }}
      ref={containerRef}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Avatar
          src={
            friendInfo.avatarFileName !== ""
              ? `${baseURL}/pic/avatar/${friendInfo.avatarFileName}`
              : null
          }
          alt="you"
          sx={{
            m: 2,
          }}
        />
        {type === "text" ? (
          <Paper
            elevation={0}
            sx={{
              maxWidth: 370,
              p: 1.5,
              backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
              color: "white",
              borderRadius: " 0 10px 10px 10px",
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
                style={{
                  borderRadius: "20px",
                }}
                onClick={() => setShowModal(true)}
              />
              ;
            </Paper>
            <ModalImageViewer
              showModal={showModal}
              handleCloseModal={handleCloseModal}
            />
          </>
        )}

        {hovered ? (
          <Box
            sx={{
              alignSelf: type === "text" ? "center" : "start",
            }}
          >
            <IconButton onClick={showMenu}>
              <MoreVert sx={{ color: "ThreeDDarkShadow" }} />
            </IconButton>
          </Box>
        ) : null}

        <MessageMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} id={id} />
      </Box>
      {/* </Slide> */}
    </Box>
  );
}
