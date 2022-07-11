import { ColorLens, Phonelink, Security, Timer } from "@mui/icons-material";
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import Representation from "../../Assets/img/illustration-reset.jpg";

function About() {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box
            sx={{
                bgcolor: "#1a1d78",
                width: "100%",
                height: mobile ? '100%' : "100vh",
            }}
        >
            <Box
                sx={{
                    width: mobile ? '100vw' : "93.75vw",
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
                    left: { xs: 0, lg: 40 },
                    mx: { xs: '1vw', lg: 0 },
                    p: 4,
                    width: { xs: "85vw", lg: '75vw' },
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
                            src={Representation}
                            alt="Representation"
                            style={{
                                width: mobile ? '100%' : 420,
                                height: mobile ? 'auto' : 420
                            }}
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
                    left: mobile ? '10vw' : 180,
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
