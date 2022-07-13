import { Box, Grid, Stack, TextField, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Services/Api/signup";
import { upload } from "../../Services/Api/uploadAvatar";
import { updateAllUserData } from "../../Services/Data/user/userSlice";
import { fetchingTheFriendsCollections } from "src/Services/Data/friends/friendscollectionsSlice";
import { fetchNotificationsFromTheServer } from "../../Services/Data/notificationSlice";
import { fetchRequestFromTheServer } from "../../Services/Data/requestSlice";
import { fadeIn } from "./slideIn";
import { motion } from "framer-motion";

export default function Step3() {
    // STATE FOR SELECTED FILES
    const [selectedFiles, setselectedFiles] = useState(undefined);

    // HANDLE THE FILE SELECTED
    const selectFile = (e) => setselectedFiles(e.target.files);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            bio: "",
        },

        onSubmit: (values) => {
            if (selectedFiles.length > 0) {
                console.log(selectedFiles);
                const formData = new FormData();
                formData.append("avatar", selectedFiles[0]);

                upload(formData)
                    .then((result) => {
                        console.log(result);
                        if (result.isUpload) {
                            console.log(">>", user);
                            const newUser = {
                                ...user,
                                avatarFileName: result.avatarFileName,
                                bio: values.bio,
                            };

                            signup(newUser)
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
                        <Box sx={{ mx: 2, pt: 1 }}>
                            <label htmlFor="raised-button-file">Choose an avatar</label>
                        </Box>

                        <Button variant="contained" component="label">
                            Upload
                            <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="raised-button-file"
                                type="file"
                                onChange={selectFile}
                            />
                        </Button>
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
