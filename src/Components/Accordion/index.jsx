import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import StandardImageList from "../ImageList";
import { Collections } from "@mui/icons-material";
import { iconsStyleSmall } from "../VerticalTabs";

export default function MediaAccordion() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ height: "4rem" }}
      >
        <ListItemButton alignItems="">
          <ListItemAvatar>
            <Collections sx={iconsStyleSmall} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Medias
              </Typography>
            }
          />
        </ListItemButton>
      </AccordionSummary>
      <AccordionDetails>
        <StandardImageList />
      </AccordionDetails>
    </Accordion>
  );
}
