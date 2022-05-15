import { CameraAlt, Send } from "@mui/icons-material";
import { Box, IconButton, Modal, TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { iconsStyleSmall } from "../VerticalTabs";
import { useSelector } from "react-redux";
import { SocketContext } from "../../Config/socket";
import { upload } from "../../Services/Api/uploadAvatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 1,
};

export default function SendField() {
  const user = useSelector((state) => state.user);
  const friend = useSelector((state) => state.friend);
  const messages = useSelector((state) => state.messages);
  const medias = useSelector((state) => state.medias);
  const socket = useContext(SocketContext);

  /* Show Picture modal */
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  /* Previewing image before send */
  const [selectedImage, setSelectedImage] = useState();
  // Triggered when the file field change
  const imageChange = (e) => {
    console.log(e.target.files);

    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setShowModal(true);
    }
  };
  // console.log(selectedImage);
  const [value, setValue] = useState("");

  const handleImageSender = () => {
    const formData = new FormData();
    formData.append("avatar", selectedImage);
    upload(formData)
      .then((result) => {
        console.log("upload image", result);
        const date = new Date();
        const dateFormated = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
        const payload = {
          id: date.toString(),
          auth: `${user._id}`,
          messageType: "media",
          mediaId: result.avatarFileName,
          timeStamp: dateFormated,
        };
        /*userId, friendId,  messageId  */
        const data = {
          userId: user._id,
          friendId: friend._id,
          messagesId: messages._id,
          mediasId: medias._id,
        };
        console.log(">data msg", data);
        socket.emit("SEND_MESSAGE", data, payload);

        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleTextSender = () => {
    const date = new Date();
    const dateFormated = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
    console.log(dateFormated);
    if (value !== "") {
      const payload = {
        id: date.toString(),
        auth: `${user._id}`,
        messageType: "text",
        content: value,
        timeStamp: dateFormated,
      };
      /*userId, friendId,  messageId  */
      const data = {
        userId: user._id,
        friendId: friend._id,
        messagesId: messages._id,
      };
      console.log("> before sending", messages);
      socket.emit("SEND_MESSAGE", data, payload);
      // dispatch(addNewMessage(payload));

      setValue("");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",

        borderRadius: "10px 10px 0 0",
        py: 1,
        px: 2,
        bgcolor: "#F3F4FD",
      }}
    >
      <TextField
        id=""
        fullWidth
        placeholder="Type your message"
        multiline
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleTextSender();
            setValue("");
          }
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{
            pl: 1.5,
          }}
          component="label"
        >
          <CameraAlt sx={iconsStyleSmall} />
          <input
            id="fileupload"
            accept="image/*"
            type="file"
            onChange={imageChange}
            hidden
          />
        </IconButton>
      </Box>{" "}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-describedby="modal-box"
      >
        <Box sx={style} id="modal-box">
          {selectedImage && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="thumb"
                width={"100%"}
                height={250}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" onClick={handleImageSender}>
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{
            pl: 1.5,
            pr: 2,
          }}
          onClick={handleTextSender}
        >
          <Send sx={iconsStyleSmall} />
        </IconButton>
      </Box>
    </Box>
  );
}
