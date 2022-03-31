import { Box, Grid, Stack, TextField, Typography, Button } from "@mui/material";
import React from "react";

export default function Step3() {
  return (
    <Stack>
      <Box sx={{ my: 4 }}>
        <Typography variant="body2">Step 3/3</Typography>
        <Typography variant="h4">Avatar and Biography</Typography>
      </Box>
      <Grid container>
        <Grid item lg={12} sx={{ pr: 2, mb: 5 }}>
          <TextField
            label="Bio"
            placeholder="Tell about yourself"
            multiline
            rows={5}
            fullWidth
          />
        </Grid>
        <Grid
          item
          lg={12}
          sx={{ pr: 2, mb: 5, display: "flex", justifyContent: "flex-start" }}
        >
          <Box sx={{ mx: 2, pt: 1 }}>
            <label htmlFor="raised-button-file">Choose an avatar</label>
          </Box>

          <Button variant="contained" component="label">
            Upload
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
            />
          </Button>
        </Grid>
        <Grid
          item
          lg={12}
          sx={{ pr: 2, mb: 5, display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained">Completed</Button>
        </Grid>
      </Grid>
    </Stack>
  );
}
