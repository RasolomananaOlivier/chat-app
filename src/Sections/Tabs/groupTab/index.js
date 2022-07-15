import { Add, Edit, More } from "@mui/icons-material";
import { Avatar, Badge, Box, Button, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../Config/socket";
import MultipleSelect from "../../../Components/Input/MultiSelect/multiSelect";
import Userbox from "../../../Components/Box/Userbox";

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

export default function GroupTab({ handleOpenMessage }) {
    const ref = useRef(null);

    const [listFriends, setlistFriends] = useState([]);
    const [onlineUsersState, setonlineUsersState] = useState([]);
    const [createGroup, setCreateGroup] = useState(false);

    const user = useSelector((state) => state.user);
    const socket = useContext(SocketContext);

    const openCreateGroup = () => {
        setCreateGroup(true)
    }

    const closeCreateGroup = () => {
        setCreateGroup(false)
    }

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

    const messageList = useSelector((state) => state.messagesArray);
    const currentMessage = useSelector((state) => state.messages);

    const messageGroupList = messageList?.filter(message => message.type === 'public')

    useEffect(() => {
        setlistFriends([...friendStore]);
    }, [friendStore]);

    return (
        <List className="disable-scrollbar" ref={ref}>
            <ListItemButton sx={{ border: 'dotted', p: 0 }} onClick={openCreateGroup}>
                <ListItemIcon><Add /></ListItemIcon>
                <ListItemText>Create a group</ListItemText>
            </ListItemButton>
            <AnimatePresence>
                {createGroup && <CreateGroupModal open={createGroup} handleClose={closeCreateGroup} />}
            </AnimatePresence>

            {listFriends.length === 0 ? (
                <div>You don t have a group</div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* {friendStore.map((item) => (
                        <motion.div key={item._id} variants={listVariants}>
                            <Userbox
                                name={`${item.lastName} ${item.firstName}`}
                                active={item._id === friend._id}
                                id={item._id}
                                avatarFileName={item.avatarFileName}
                                online={onlineUsersState.some((online) => online === item._id)}
                                handleOpenMessage={handleOpenMessage}
                                pseudoList={item.pseudos}
                            />
                        </motion.div>
                    ))} */}
                </motion.div>
            )}
        </List>
    );
}

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
}
function CreateGroupModal({ open, handleClose }) {
    const [selectedFiles, setselectedFiles] = useState(undefined);
    const ref = useRef(null);

    const formik = useFormik({
        initialValues: {
            groupName: '',
            members: [],
        },
        /*         validate: (values) => {
                    return validateSignup(values);
                }, */
        onSubmit: (values) => {
            console.log('values :>> ', values, ref.current.files);
        },
    });
    const addImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setselectedFiles(readerEvent.target.result)
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                {open &&
                    <motion.div
                        initial={{ y: -400, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -600, opacity: 0 }}>
                        <Paper sx={{ p: 3 }}>
                            <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                                <Typography variant='h3'  >Create a group</Typography>
                                <Box display={'flex'} justifyContent='center' py={2}>
                                    <Badge
                                        badgeContent={
                                            <IconButton onClick={() => ref.current.click()}>
                                                <Add />
                                            </IconButton>}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                        <Avatar src={selectedFiles} alt='group pdp' style={{ height: 80, width: 80 }} />
                                    </Badge>
                                    <input
                                        accept="image/*"
                                        hidden
                                        id="raised-button-file"
                                        type="file"
                                        onChange={addImage}
                                        ref={ref}
                                    />
                                </Box>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{ pr: { xs: 0, lg: 2 }, mb: { xs: 3, lg: 5 } }}
                                    >
                                        <TextField
                                            name="groupName"
                                            label="Name"
                                            fullWidth
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{ pr: { xs: 0, lg: 2 }, mb: { xs: 3, lg: 5 } }}
                                    >
                                        <MultipleSelect handleChange={formik.handleChange} initialValue={formik.values.members} />
                                    </Grid>


                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    sx={{ display: "flex", justifyContent: "space-between", mr: 2.6 }}
                                >
                                    <Button variant="contained" type="submit">
                                        Create
                                    </Button>
                                    <Button variant="outlined" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Box>
                        </Paper>
                    </motion.div>
                }
            </Box >
        </Modal >
    )
}
