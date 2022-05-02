import { Button, Grid, Stack, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import SecurityIllustration from "../../Assets/img/security.jpg";
import { SocketContext } from "../../Config/socket";

export default function Security() {
  return (
    <>
      <Grid item lg={6}>
        <img
          src={SecurityIllustration}
          alt=""
          srcset=""
          width={350}
          height={360}
        />
      </Grid>
      <Grid item lg={6}>
        <Stack spacing={3}>
          <TextField label="Current password" fullWidth />

          <TextField label="New password" fullWidth />

          <TextField label="Type it again" fullWidth />

          <Grid
            item
            display="flex"
            alignItems="end"
            justifyContent="flex-end"
            lg={12}
          >
            <Button variant="contained" color="primary">
              Change Password
            </Button>
          </Grid>
        </Stack>
      </Grid>
    </>
  );
}
