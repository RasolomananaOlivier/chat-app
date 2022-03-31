import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import VerticalTabsSetting from "../Components/VerticalTabs/veriticalTabsSetting";

export default function SettingLayout() {
  const [header, setheader] = useState("Manage your account");

  return (
    <Box sx={{ bgcolor: "#1a1d78", width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          pt: 1,
          pb: 4,
        }}
        className="background"
      >
        <Typography color={"white"} variant="h2">
          {header}
        </Typography>
        <Typography color={"white"} variant="subtitle2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a?
        </Typography>
      </Box>
      <Container
        sx={{
          position: "relative",
          left: 0,
          bottom: "5.5rem",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            px: 3,
            py: 6,
            position: "relative",
            top: 70,
            height: "60vh",
          }}
        >
          <Grid container display="flex">
            <Grid lg={2}>
              <VerticalTabsSetting setheader={setheader} />
            </Grid>
            <Grid
              container
              sx={{
                width: "80%",
                py: 2,
                px: 5,
              }}
            >
              <Outlet />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
