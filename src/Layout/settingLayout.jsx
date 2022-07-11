import { Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import TabsSetting from "../Components/VerticalTabs/TabsSetting";
import Setting from "../Pages/Setting";
import Other from "../Pages/Setting/other";
import Preference from "../Pages/Setting/preference";
import Security from "../Pages/Setting/security";

export default function SettingLayout() {
    const [header, setheader] = useState("Manage your account");
    const [value, setValue] = useState(0);

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("md"));

    const renderTab = () => RenderTab(value);

    return (
        <Box sx={{ bgcolor: "#1a1d78", width: "100%", minHeight: '100vh', height: { xs: '100%', lg: '100vh' } }}>
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
                <Typography color={"white"} variant={mobile ? 'h5' : 'h2'}>
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
                        px: { xs: 0, lg: 2 },
                        py: { xs: 0, lg: 6 },
                        position: "relative",
                        top: 70,
                        height: { xs: '100%', lg: "60vh" },
                    }}
                >
                    <Grid container display="flex">
                        <Grid lg={2}>
                            <TabsSetting
                                setheader={setheader}
                                value={value}
                                setValue={setValue}
                            />
                        </Grid>
                        <Grid
                            container
                            sx={{
                                width: { xs: '100%', lg: "80%" },
                                py: 2,
                                px: { xs: 3, lg: 5 },
                            }}
                        >
                            {renderTab()}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}
function RenderTab(value) {
    switch (value) {
        case 0:
            return <Setting />;
        case 1:
            return <Security />;
        case 2:
            return <Preference />;
        default:
            return <Other />;
    }
}

