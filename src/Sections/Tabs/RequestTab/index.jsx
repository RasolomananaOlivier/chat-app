import { Divider, List, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users } from "src/Services/Api/users";
import { SocketContext } from "../../../Config/socket";
import { fetchRequestFromTheServer } from "../../../Services/Data/requestSlice";
import RequestBox, { SuggestionBox } from "./requestBox";

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
        Users.viewAll(user._id)
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
            sx={{
                p: 0,
                color: "white",
            }}
            className="disable-scrollbar"
        >
            <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ pt: 1 }}>
                    List of friend request :
                </Typography>
                {requestCollections.length === 0 ? (
                    <div>No request </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <AnimatePresence>
                            {requestCollections.map((request) => {
                                return (
                                    <motion.div
                                        variants={listVariants}
                                        exit={{ scale: 0, transition: { duration: 0.2 } }}
                                        key={request._id}
                                        style={{ marginBottom: 10 }}
                                    >
                                        <RequestBox
                                            id={request._id}
                                            name={`${request.lastName} ${request.firstName}`}
                                            friendData={request}
                                            avatarFileName={request.avatarFileName}
                                            collections={requestCollections}
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </Stack>
            <Divider sx={{ backgroundColor: "#CFC8C8" }} />
            <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ pt: 1 }}>
                    Person you may know :
                </Typography>
                {suggestions.length === 0 ? (
                    <div>No suggestion </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <AnimatePresence>
                            {suggestions.map((suggestion) => {
                                return (
                                    <motion.div
                                        variants={listVariants}
                                        exit={{ scale: 0, transition: { duration: 0.2 } }}
                                        key={suggestion._id}
                                        style={{ marginBottom: 12 }}
                                    >
                                        <SuggestionBox
                                            id={suggestion._id}
                                            avatarFileName={suggestion.avatarFileName}
                                            name={`${suggestion.lastName} ${suggestion.firstName}`}
                                            details={suggestion}
                                            email={suggestion.email}
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}
            </Stack>
        </List>
    );
}
