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
import { iconsStyleSmall } from "../../Navigation/VerticalTabs";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { SocketContext } from "src/Config/socket";

export default function MemberAccordion() {
    const [edit, setEdit] = React.useState(false);
    // const [friendpseudosState, setFriendpseudosState] = React.useState('');


    const userpseudosList = useSelector((state) => state.user?.pseudos);
    const currentMessageId = useSelector(state => state.messages._id)
    console.log('currentMessageId :>> ', currentMessageId);
    console.log('userpseudosList :>> ', userpseudosList);

    const currentUserpseudos = getpseudos(userpseudosList, currentMessageId)
    console.log('currentUserpseudos :>> ', currentUserpseudos);


    const friendpseudosList = useSelector((state) => state.friend.pseudos);
    console.log('friendpseudosList :>> ', friendpseudosList);
    const currentFriendpseudos = getpseudos(friendpseudosList, currentMessageId)

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
                    ? <Modifypseudos
                        userpseudos={currentUserpseudos}
                        friendpseudos={currentFriendpseudos}
                        closeEdit={closeEdit}
                    />
                    : (<List sx={{ position: 'relative', }}>
                        <Stack direction={'row'} justifyContent='end' sx={{ position: 'absolute', width: '100%' }} >
                            <IconButton onClick={showEdit}><Edit /></IconButton>
                        </Stack>
                        <ListItemText>
                            {currentUserpseudos?.value}
                        </ListItemText>
                        <ListItemText>
                            {currentFriendpseudos?.value}
                        </ListItemText>
                    </List>
                    )
                }


            </AccordionDetails>
        </Accordion>
    );
}

function getpseudos(userpseudosList, currentMessageId) {
    return userpseudosList.find(pseudos => pseudos.messageId === currentMessageId);
}

function Modifypseudos({ userpseudos, friendpseudos, closeEdit }) {
    const socket = React.useContext(SocketContext);
    const userId = useSelector(state => state.user._id)
    const friendId = useSelector(state => state.friend._id)

    const initialValues = {
        userpseudos: userpseudos.value,
        friendpseudos: friendpseudos.value
    };
    const formik = useFormik({
        initialValues,
        onSubmit: modifypseudosHandler(userpseudos, friendpseudos, userId, friendId, socket, closeEdit),
    });
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={1}>
                <TextField
                    name="userpseudos"
                    onChange={formik.handleChange}
                    value={formik.values.userpseudos}
                />
                <TextField
                    name="friendpseudos"
                    onChange={formik.handleChange}
                    value={formik.values.friendpseudos}
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

function modifypseudosHandler(userpseudos, friendpseudos, userId, friendId, socket, closeEdit) {
    return (values) => {
        const data = {
            newUserpseudos: {
                ...userpseudos,
                value: values.userpseudos
            },
            newFriendpseudos: {
                ...friendpseudos,
                value: values.friendpseudos
            },
            userId,
            friendId
        };
        console.log('data :>> ', data);
        socket.emit('MODIFY_pseudos', data);
        closeEdit();
    };
}
