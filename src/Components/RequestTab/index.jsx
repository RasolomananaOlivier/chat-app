import { List, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import RequestBox from "./requestBox";

export default function RequestTab() {
  const requestCollections = useSelector((state) => state.requests);

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
                name={`${request.name} ${request.firstName}`}
                details={request}
                collections={requestCollections}
              />
            );
          })
        )}
      </Stack>
    </List>
  );
}
