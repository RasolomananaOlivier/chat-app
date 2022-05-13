import { List } from "@mui/material";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../Config/socket";
import Userbox from "../Userbox";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {listFriends.map((item) => (
            <motion.div key={item._id} variants={listVariants}>
              <Userbox
                name={`${item.lastName} ${item.firstName}`}
                active={item._id === friend._id}
                id={item._id}
                avatarFileName={item.avatarFileName}
                online={onlineUsersState.some((online) => online === item._id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </List>
  );
}
