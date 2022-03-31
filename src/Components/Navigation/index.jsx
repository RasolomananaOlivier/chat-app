import React from "react";

/* MUI Component */
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import VerticalTabs from "../VerticalTabs";

/* Item style */
const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
}));

/* BadgeStyle */
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: 15,
    height: 15,
    backgroundColor: "#44b700",
    color: "#44b700",
    borderRadius: "50%",
    boxShadow: `0 0 0 2px rgba(255,255,255,0.2)`,
  },
}));

function SideNavigation() {
  return (
    <Stack sx={{ height: "100vh", bgcolor: "rgb(25, 25, 80)" }}>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        sx={{ p: 3, mt: 2 }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="" sx={{ width: 50, height: 50 }} />
        </StyledBadge>
      </Box>

      <VerticalTabs />
    </Stack>
  );
}

export default SideNavigation;
