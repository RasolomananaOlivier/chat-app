import React, { useCallback, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import IconLabelTabs from "../../Components/IconLabelTabs";
import TextField from "@mui/material/TextField";
import { Button, makeStyles } from "@mui/material";
import Messagelayout from "../../Layout/messagelayout";
import MessageDetails from "../../Components/MessageDetails";
import "../../Assets/css/utils.css";
import RecentMessage from "../../Components/RecentMessage";
import RequestTab from "../../Components/RequestTab";
import NotificationTab from "../../Components/NotificationTab.jsx";
import { socket, SocketContext } from "../../Config/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequestFriend,
  fetchRequestFromTheServer,
} from "../../Services/Data/requestSlice";
import { fetchingTheFriendsCollections } from "../../Services/Data/friendscollectionsSlice";
import { fetchNotificationsFromTheServer } from "../../Services/Data/notificationSlice";
import {
  addOneMessageCollection,
  addOneMessageToOneCollection,
  fetchMessageCollectionFromServer,
} from "../../Services/Data/messagesArraySlice";
import { getAllMessage } from "../../Services/Api/allmessage";
import { addNewMessage } from "../../Services/Data/messageSlice";
import {
  addOneMedia,
  addOneMediaIdToOneMediaCollection,
  fetchMediasCollectionsFromTheServer,
} from "../../Services/Data/allMediasSlice";
import { updateMedias } from "../../Services/Data/mediaSlice";
import { getAllMedias } from "../../Services/Api/allmedia";

function HomeWithContext() {
  return (
    <SocketContext.Provider value={socket}>
      <Home />
    </SocketContext.Provider>
  );
}

function Home() {
  const [value, setValue] = React.useState(0);
  const userId = useSelector((state) => state.user._id);
  const messages = useSelector((state) => state.messages);

  console.log("redux msg", messages);

  const socket = useContext(SocketContext);

  useEffect(() => {
    getAllMessage(userId)
      .then((result) => {
        dispatch(fetchMessageCollectionFromServer(result));
      })
      .catch((err) => {
        console.log(err);
      });
    getAllMedias(userId)
      .then((result) => {
        dispatch(fetchMediasCollectionsFromTheServer(result));
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on("connect", () => {
      console.log("connected ?", socket.connected);
    });

    socket.on(`${user._id}_NEW_NOTIFICATION`, (data, message, media) => {
      console.log("notify", data, message);
      dispatch(fetchNotificationsFromTheServer(data.notificationsCollections));
      dispatch(fetchingTheFriendsCollections(data.friendsCollections));
      dispatch(fetchRequestFromTheServer(data.requests));
      dispatch(addOneMessageCollection(message));
      dispatch(addOneMedia(media));
    });
    socket.on(`${user._id}_NEW_REQUEST`, (requestArray) => {
      console.log("req", requestArray);
      dispatch(addRequestFriend(requestArray));
    });
    socket.on("hello", (arg) => {
      console.log("test", arg);
    });

    socket.on(`${user._id}_NEW_FRIEND_ACCEPTED`, (data, message, media) => {
      console.log("accepted request", data, message);

      dispatch(fetchingTheFriendsCollections(data.friendsCollections));
      dispatch(fetchRequestFromTheServer(data.requests));
      dispatch(addOneMessageCollection(message));
      dispatch(addOneMedia(media));
    });

    socket.on(`${user._id}_NEW_MESSAGE`, (data, mediaData) => {
      const { items } = data;
      console.log("> media", mediaData);
      // console.log("new message", data);
      dispatch(addOneMessageToOneCollection(data));
      if (mediaData !== null) {
        dispatch(addOneMediaIdToOneMediaCollection(mediaData));
      }

      const localStorageMessages = JSON.parse(
        localStorage.getItem(`messages-${user._id}`)
      );
      console.log("compare", localStorageMessages._id, data._id);
      if (localStorageMessages._id === data._id) {
        // console.log(data.items[items.length - 1]);
        const payload = data.items[items.length - 1];
        dispatch(addNewMessage(payload));
        if (mediaData !== null) {
          dispatch(updateMedias(mediaData));
        }
      }
    });

    socket.on("disconnect", () => {
      socket.connect();
    });
  }, []);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const render = useCallback(() => {
    if (value === 0) {
      return <RecentMessage />;
    } else if (value === 1) {
      return <RequestTab />;
    } else {
      return <NotificationTab />;
    }
  }, [value]);

  const handleClick = () => {
    socket.emit("test", { o: "0" });
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item md={3}>
        {/* <Button onClick={handleClick}>test</Button> */}
        <Stack
          spacing={2}
          sx={{
            height: "96vh",
            px: 1.8,
            py: 2.5,
            bgcolor: "#1a1d78",
          }}
        >
          <Box>
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
          <Box>
            <IconLabelTabs value={value} setValue={setValue} />
          </Box>
          {/* Main content of this grid */}
          {render()}
        </Stack>
      </Grid>
      <Grid item md={6} sx={{ mt: 2 }}>
        <Messagelayout />
      </Grid>
      <Grid item md={3}>
        <MessageDetails />
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

export default HomeWithContext;
