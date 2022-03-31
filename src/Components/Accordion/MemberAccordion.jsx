import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Group } from "@mui/icons-material";
import { iconsStyleSmall } from "../VerticalTabs";
import { useSelector } from "react-redux";

export default function MemberAccordion() {
  /**
   * Get the user store data
   */
  const user = useSelector((state) => state.user);

  /**
   * Get the friend store data
   */
  const friend = useSelector((state) => state.friend);

  return (
    <Accordion sx={{ p: 0 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ height: "4rem" }}
      >
        <ListItemButton alignItems="">
          <ListItemAvatar>
            <Group sx={iconsStyleSmall} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Members
              </Typography>
            }
          />
        </ListItemButton>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <ListItemText>
            {user.hasOwnProperty("_id")
              ? `${user.lastName} ${user.firstName}`
              : "No name"}
          </ListItemText>
          <ListItemText>
            {friend.hasOwnProperty("_id")
              ? `${friend.lastName} ${friend.firstName}`
              : "No name"}
          </ListItemText>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
