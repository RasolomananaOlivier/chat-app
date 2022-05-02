import { Box, Button, Modal } from "@mui/material";
import { baseURL } from "../../Config/server";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
};

export default function ModalImageViewer({
  showModal,
  handleCloseModal,
  mediaFileName,
}) {
  return (
    <Modal
      open={showModal}
      onClose={handleCloseModal}
      aria-describedby="modal-box"
    >
      <Box sx={style} id="modal-box">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <img
            src={
              mediaFileName !== undefined || mediaFileName !== ""
                ? `${baseURL}/pic/avatar/${mediaFileName}`
                : null
            }
            alt="thumb"
            width={"100%"}
            height={250}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained">Saved</Button>
        </Box>
      </Box>
    </Modal>
  );
}
