import { Divider, List, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../Config/socket";
import { getAllUser } from "../../Services/Api/allUser";
import { fetchRequestFromTheServer } from "../../Services/Data/requestSlice";
import RequestBox, { SuggestionBox } from "./requestBox";

export default function RequestTab() {
  const requestCollections = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);
  const user = useSelector((state) => state.user);
  const socket = useContext(SocketContext);

  socket.on(`${user._id}-DELETE-REQUEST`, (requestData) => {
    dispatch(fetchRequestFromTheServer(requestData));
  });
  useEffect(() => {
    getAllUser(user._id)
      .then((result) => {
        setSuggestions(result);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <List
      sx={{ p: 0, height: "100%", overflowY: "scroll" }}
      className="disable-scrollbar"
    >
      <Stack spacing={1} sx={{ width: "100%" }}>
        {requestCollections.length === 0 ? (
          <div>No request </div>
        ) : (
          requestCollections.map((request) => {
            return (
              <RequestBox
                id={request._id}
                name={`${request.lastName} ${request.firstName}`}
                details={request}
                avatarFileName={request.avatarFileName}
                collections={requestCollections}
              />
            );
          })
        )}
      </Stack>
      <Divider />
      <Stack spacing={1} sx={{ width: "100%" }}>
        {suggestions.length === 0 ? (
          <div>No suggestion </div>
        ) : (
          suggestions.map((suggestion) => {
            return (
              <SuggestionBox
                id={suggestion._id}
                avatarFileName={suggestion.avatarFileName}
                name={`${suggestion.lastName} ${suggestion.firstName}`}
                details={suggestion}
                email={suggestion.email}
              />
            );
          })
        )}
      </Stack>
    </List>
  );
}
