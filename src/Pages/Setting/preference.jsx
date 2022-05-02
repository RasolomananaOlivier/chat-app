import { Box } from "@mui/material";
import Underconstruction from "../../Assets/img/underconstruction.jpg";

export default function Preference() {
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
      <img src={Underconstruction} alt="" width={300} height={300} />
      <div>Oops ! Still underconstruction .</div>
    </Box>
  );
}
