import { List } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../Config/socket";
import Userbox from "../Userbox";

export default function RecentMessage() {
  const ref = useRef(null);

  const [listFriends, setlistFriends] = useState([]);
  const [onlineUsersState, setonlineUsersState] = useState([]);
  const user = useSelector((state) => state.user);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.emit("USER-CONNECTED", user._id);
    socket.on("ONLINE_USERS", (onlineUsers) => {
      setonlineUsersState(onlineUsers);
    });
    socket.on("OFFLINE_USERS", (offlineUsers) => {
      setonlineUsersState(offlineUsers);
    });
    // eslint-disable-next-line
  }, []);

  /*-- Get all friends --- */
  const friendStore = useSelector((state) => state.friendsCollections);
  const friend = useSelector((state) => state.friend);

  useEffect(() => {
    // console.log(friendStore);
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
            avatarFileName={item.avatarFileName}
            online={onlineUsersState.some((online) => online === item._id)}
          />
        ))
      )}
    </List>
  );
}
