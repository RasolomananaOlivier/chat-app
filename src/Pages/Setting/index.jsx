import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveAccountDialog } from "src/Components/Displays/AlertDialog";
import { Users } from "src/Services/Api/users";
import { updateAllUserData } from "../../Services/Data/user/userSlice";

function Setting() {
    const userInfo = useSelector((state) => state.user);
    const dispatch = useDispatch();

    /* Show dialog */
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [updated, setupdated] = useState(false);

    const formik = useFormik({
        initialValues: {
            lastName: userInfo.lastName,
            firstName: userInfo.firstName,
            email: userInfo.email,
            bio: userInfo.bio,
        },
        onSubmit: (values) => {
            const data = {
                _id: userInfo._id,
                ...values,
            };
            Users.updateAccount(data)
                .then((result) => {
                    console.log("after update", result);
                    dispatch(updateAllUserData(result));
                    setupdated(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });
    return (
        <>
            <Grid item xs={12}
                lg={6}
                sx={{ pr: { xs: 0, lg: 2 }, mb: { xs: 3, lg: 5 } }}>
                <TextField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                />
            </Grid>
            <Grid item xs={12}
                lg={6}
                sx={{ pr: { xs: 0, lg: 2 }, mb: { xs: 3, lg: 5 } }}>
                <TextField
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                />
            </Grid>
            <Grid item xs={12}
                lg={6}
                sx={{ pr: { xs: 0, lg: 2 }, mb: { xs: 3, lg: 5 } }}>
                <TextField
                    name="label"
                    label="Email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
            </Grid>
            <Grid item xs={12}
                lg={6}
                sx={{ pr: { xs: 0, lg: 2 }, mb: { xs: 3, lg: 5 } }}>
                <TextField
                    name="bio"
                    label="Bio"
                    fullWidth
                    rows={5}
                    multiline
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                />
            </Grid>
            <Grid
                item
                display="flex"
                alignItems="end"
                justifyContent="flex-end"
                lg={12}
            >
                <Button
                    variant="contained"
                    color="error"
                    sx={{ mr: 1.5 }}
                    onClick={handleClickOpen}
                >
                    Delete Account
                </Button>
                <RemoveAccountDialog open={open} handleClose={handleClose} />
                {updated ? (
                    <Button color="success" variant="contained">
                        Successfully updated
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={formik.handleSubmit}
                    >
                        Update
                    </Button>
                )}
            </Grid>
        </>
    );
}

export default Setting;
