import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Logout, CoPresent, Palette, VerifiedUser } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}



export default function TabsSetting({ setheader, value, setValue }) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    const tabIndicatorStyle = { style: { left: 1 }, }
    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                    height: "100%",
                    width: { xs: '90vw', lg: 'auto' }
                }}
            >
                <Tabs
                    orientation={mobile ? 'horizontal' : 'vertical'}
                    variant={mobile ? 'scrollable' : 'standard'}
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderLeft: 0, borderColor: "divider", width: "100%" }}
                    TabIndicatorProps={!mobile && tabIndicatorStyle}
                >
                    <Tab
                        sx={{
                            display: "flex",
                            fontSize: 13,

                            justifyContent: "start",
                        }}
                        icon={<CoPresent />}
                        iconPosition="start"
                        label="Account"
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{
                            display: "flex",
                            fontSize: 13,

                            justifyContent: "start",
                        }}
                        icon={<VerifiedUser />}
                        iconPosition="start"
                        label="Security"
                        {...a11yProps(1)}
                    />
                    <Tab
                        sx={{
                            display: "flex",
                            fontSize: 13,

                            justifyContent: "start",
                        }}
                        icon={<Palette />}
                        iconPosition="start"
                        label="Preference"
                        {...a11yProps(2)}
                    />
                    <Tab
                        sx={{
                            display: "flex",
                            fontSize: 13,

                            justifyContent: "start",
                        }}
                        icon={<Logout />}
                        iconPosition="start"
                        label="Other"
                        {...a11yProps(3)}
                    />
                </Tabs>
            </Box>
        </>
    );
}
