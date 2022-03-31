import { List } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Userbox from "../Userbox";

export default function RecentMessage() {
  const ref = useRef(null);

  const [listFriends, setlistFriends] = useState([]);

  /*-- Get all friends --- */
  const friendStore = useSelector((state) => state.friendsCollections);
  const friend = useSelector((state) => state.friend);

  useEffect(() => {
    console.log(friendStore);
    setlistFriends([...friendStore]);
  }, [friendStore]);

  return (
    <List
      sx={{
        height: "72vh",
        overflowY: "scroll",
      }}
      className="disable-scrollbar"
      ref={ref}
    >
      {listFriends.length === 0 ? (
        <div>You don t have a friend</div>
      ) : (
        listFriends.map((item) => (
          <Userbox
            name={`${item.lastName} ${item.firstName}`}
            active={item._id === friend._id}
            id={item._id}
            key={item}
          />
        ))
      )}
    </List>
  );
}
