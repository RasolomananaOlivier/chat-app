import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Box,
    Button,
    Grid,
    IconButton,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
} from "@mui/material";
import { Group, Edit } from "@mui/icons-material";
import { iconsStyleSmall } from "../VerticalTabs";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { SocketContext } from "src/Config/socket";

export default function MemberAccordion() {
    const [edit, setEdit] = React.useState(false);
    // const [friendNickNameState, setFriendNickNameState] = React.useState('');


    const userNickNameList = useSelector((state) => state.user?.nickName);
    const currentMessageId = useSelector(state => state.messages._id)
    console.log('currentMessageId :>> ', currentMessageId);
    console.log('userNickNameList :>> ', userNickNameList);

    const currentUserNickName = getNickname(userNickNameList, currentMessageId)
    console.log('currentUserNickName :>> ', currentUserNickName);


    const friendNickNameList = useSelector((state) => state.friend.nickName);
    console.log('friendNickNameList :>> ', friendNickNameList);
    const currentFriendNickName = getNickname(friendNickNameList, currentMessageId)

    const showEdit = () => {
        setEdit(true);
    }
    const closeEdit = () => {
        setEdit(false)
    }
    /* 
        React.useEffect(() => {
            
        }, []); */

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

                {edit
                    ? <ModifyNickName
                        userNickname={currentUserNickName}
                        friendNickname={currentFriendNickName}
                        closeEdit={closeEdit}
                    />
                    : (<List sx={{ position: 'relative', }}>
                        <Stack direction={'row'} justifyContent='end' sx={{ position: 'absolute', width: '100%' }} >
                            <IconButton onClick={showEdit}><Edit /></IconButton>
                        </Stack>
                        <ListItemText>
                            {currentUserNickName?.value}
                        </ListItemText>
                        <ListItemText>
                            {currentFriendNickName?.value}
                        </ListItemText>
                    </List>
                    )
                }


            </AccordionDetails>
        </Accordion>
    );
}

function getNickname(userNickNameList, currentMessageId) {
    return userNickNameList.find(nickName => nickName.messageId === currentMessageId);
}

function ModifyNickName({ userNickname, friendNickname, closeEdit }) {
    const socket = React.useContext(SocketContext);
    const userId = useSelector(state => state.user._id)
    const friendId = useSelector(state => state.friend._id)

    const initialValues = {
        userNickname: userNickname.value,
        friendNickname: friendNickname.value
    };
    const formik = useFormik({
        initialValues,
        onSubmit: modifyNickNameHandler(userNickname, friendNickname, userId, friendId, socket, closeEdit),
    });
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={1}>
                <TextField
                    name="userNickname"
                    onChange={formik.handleChange}
                    value={formik.values.userNickname}
                />
                <TextField
                    name="friendNickname"
                    onChange={formik.handleChange}
                    value={formik.values.friendNickname}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={closeEdit}
                    >
                        Cancel
                    </Button>
                </Box>
            </Stack>

        </Box>
    )
}

function modifyNickNameHandler(userNickname, friendNickname, userId, friendId, socket, closeEdit) {
    return (values) => {
        const data = {
            newUserNickname: {
                ...userNickname,
                value: values.userNickname
            },
            newFriendNickName: {
                ...friendNickname,
                value: values.friendNickname
            },
            userId,
            friendId
        };
        console.log('data :>> ', data);
        socket.emit('MODIFY_NICKNAME', data);
        closeEdit();
    };
}
