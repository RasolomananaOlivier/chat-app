import { Box } from "@mui/material";
import Underconstruction from "../../Assets/img/underContrustion.svg";

export default function Other() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <img src={Underconstruction} alt="" width={200} height={200} />
      <div>Oops ! Still underconstruction .</div>
    </Box>
  );
}
