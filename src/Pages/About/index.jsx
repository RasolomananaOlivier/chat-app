import { ColorLens, Phonelink, Security, Timer } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import Representation from "../../Assets/img/illustration-reset.jpg";

function About() {
  return (
    <Box sx={{ bgcolor: "#1a1d78", width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "93vw",
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
          Who we are
        </Typography>
        <Typography color={"white"} variant="subtitle2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a?
        </Typography>
      </Box>
      <Paper
        elevation={2}
        sx={{
          position: "relative",
          bottom: 20,
          left: 40,
          p: 4,
          width: "75vw",
        }}
      >
        <Grid container>
          <Grid item lg={7}>
            <Typography
              variant="h4"
              sx={{
                pb: 2,
              }}
            >
              Our mission
            </Typography>
            <Typography variant="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a?
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
              voluptatum. Mollitia dignissimos libero ex voluptates. Delectus ut
              sed perferendis assumenda adipisci alias quia modi dolores,
              numquam maxime fuga temporibus quos?
            </Typography>{" "}
            <br />
            <br />
            <Typography variant="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a?
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
              voluptatum.
            </Typography>
          </Grid>
          <Grid>
            <img
              width={420}
              height={420}
              src={Representation}
              alt="Representation"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          position: "relative",
          bottom: 70,
          left: 180,
          width: "70%",
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ColorLens htmlColor="#ed1845" />
          Design
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Security htmlColor="#ed1845" />
          Secure
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Timer htmlColor="#ed1845" />
          Fast
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Phonelink htmlColor="#ed1845" />
          Responsive
        </Box>
      </Paper>
    </Box>
  );
}

export default About;
