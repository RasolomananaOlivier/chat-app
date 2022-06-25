import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Messagelayout from "../../Layout/messagelayout";
import MessageDetails from "../../Components/MessageDetails";
import "../../Assets/css/utils.css";
import RecentMessage from "../../Components/RecentMessage";
import RequestTab from "../../Components/RequestTab";
import NotificationTab from "../../Components/NotificationTab.jsx";
import {
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
  motion,
} from "framer-motion";
import SendField from "src/Components/SendField";

function Home({ value, setValue }) {
  const [openMessageDetail, setOpenMessageDetail] = useState(true);

  const render = useCallback(() => {
    if (value === 0) {
      return <RecentMessage />;
    } else if (value === 1) {
      return <RequestTab />;
    } else if (value === 2) {
      return <NotificationTab />;
    }
  }, [value]);

  return (
    <Grid
      container
      sx={{
        /* border: "1px solid green", */ height: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid
        item
        md={3}
        sx={{ bgcolor: "#1a1d78" /*  border: "1px solid red" */ }}
      >
        <Stack spacing={1}>
          <Typography color="white" variant="h5" sx={{ px: 1.5, pt: 2 }}>
            {value === 0
              ? "Messages"
              : value === 1
              ? "Requests"
              : "Notifications"}
          </Typography>
          <Box sx={{ px: 1.5 }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    backgroundColor: "#0E1154",
                  }}
                >
                  <TextField
                    {...params}
                    sx={{
                      borderRadius: 1,
                      borderBlockColor: "white",
                      input: {
                        color: "white",
                      },
                      label: {
                        color: "#CFCDCD",
                      },
                    }}
                    label="Search"
                    size="medium"
                    children={
                      <Box
                        sx={{
                          mb: 1,
                          ml: 1,
                        }}
                      >
                        <Button>Search</Button>
                      </Box>
                    }
                  />{" "}
                </Box>
              )}
            />
          </Box>

          <Box
            sx={{
              height: "77vh",
              overflow: "hidden",
              px: 1.5,
              //   border: "1px solid red",
            }}
          >
            {render()}
          </Box>
        </Stack>
      </Grid>
      <Grid
        item
        md={9}
        sx={{
          display: "flex",
        }}
      >
        <LayoutGroup>
          <motion.div
            layout
            style={{
              flexGrow: 1,

              display: "flex",
              flexDirection: "column",
              //   border: "1px solid red",
              position: "relative",
            }}
          >
            <Messagelayout
              openMessageDetail={openMessageDetail}
              setOpenMessageDetail={setOpenMessageDetail}
            />
          </motion.div>
          <AnimatePresence>
            {openMessageDetail && (
              <motion.div
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                exit={{ x: 400 }}
                layout
              >
                <MessageDetails />
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </Grid>
    </Grid>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },

  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

export default Home;
