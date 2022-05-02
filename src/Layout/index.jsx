import React from "react";
import { Outlet } from "react-router-dom";
import SideNavigation from "../Components/Navigation";

import Grid from "@mui/material/Grid";
import { socket, SocketContext } from "../Config/socket";

export default function Layout() {
  return (
    <SocketContext.Provider value={socket}>
      <Grid container>
        <Grid item lg={1}>
          <SideNavigation />
        </Grid>
        <Grid item lg={11}>
          <Outlet />
        </Grid>
      </Grid>
    </SocketContext.Provider>
  );
}
