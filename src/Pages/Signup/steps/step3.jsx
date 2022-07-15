import { Box, Grid, Stack, TextField, Typography, Button, Avatar } from "@mui/material";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchingTheFriendsCollections } from "src/Services/Data/friends/friendscollectionsSlice";

import { fadeIn } from "../slideIn";
import { motion } from "framer-motion";
import { Auth } from "src/Services/Api/auth";
import { Medias } from "src/Services/Api/medias";
import { updateAllUserData } from "src/Services/Data/user/userSlice";
import { fetchNotificationsFromTheServer } from "src/Services/Data/notificationSlice";
import { fetchRequestFromTheServer } from "src/Services/Data/requestSlice";

export default function Step3() {
    // STATE FOR SELECTED FILES
    const [selectedFiles, setselectedFiles] = useState(undefined);


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const ref = useRef(null);

    const addImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setselectedFiles(readerEvent.target.result)
        }
    }

    const formik = useFormik({
        initialValues: {
            bio: "",
        },

        onSubmit: (values) => {
            if (selectedFiles.length > 0) {
                const formData = new FormData();
                formData.append("avatar", ref.current.files[0]);

                Medias.upload(formData)
                    .then((result) => {
                        if (result.isUpload) {
                            const newUser = {
                                ...user,
                                avatarFileName: result.avatarFileName,
                                bio: values.bio,
                            };

                            Auth.signup(newUser)
                                .then((response) => {
                                    console.log("final response", response);
                                    dispatch(updateAllUserData(response.user));
                                    dispatch(
                                        fetchingTheFriendsCollections(
                                            response.user.friendsCollections
                                        )
                                    );
                                    dispatch(
                                        fetchNotificationsFromTheServer(
                                            response.user.notificationsCollections
                                        )
                                    );
                                    dispatch(fetchRequestFromTheServer(response.user.requests));
                                    if (response.isRegistered) {
                                        navigate("/home");
                                    }
                                })
                                .catch((err2) => {
                                    console.log(err2);
                                });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    });

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Stack>
                <Box sx={{ my: 4 }}>
                    <Typography variant="body2">Step 3/3</Typography>
                    <Typography variant="h4">Avatar and Biography</Typography>
                </Box>
                <Grid
                    container
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        sx={{ pr: { xs: 0, lg: 2 }, mb: { xs: 3, lg: 5 } }}
                    >
                        <TextField
                            label="Bio"
                            placeholder="Tell about yourself"
                            multiline
                            rows={5}
                            fullWidth
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        sx={{ pr: 2, mb: 5, display: "flex", justifyContent: "flex-start" }}
                    >
                        <Avatar src={selectedFiles} alt='user pdp' style={{ height: 80, width: 80 }} />
                        <Box sx={{ mx: 2, pt: 1 }}>
                            <Button variant="contained" component="label">
                                Choose an avatar
                            </Button>
                            <input
                                accept="image/*"
                                hidden
                                id="raised-button-file"
                                type="file"
                                onChange={addImage}
                                ref={ref}
                            />
                        </Box>

                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            pr: 2,
                            mb: 5,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button variant="contained" href="/login" hidden>
                            Back to sign in
                        </Button>
                        <Button variant="contained" type="submit">
                            Completed
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </motion.div>
    );
}
