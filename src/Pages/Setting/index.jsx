import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RemoveAccountDialog } from "../../Components/AlertDialog";

function Setting() {
  const userInfo = useSelector((state) => state.user);

  /* Show dialog */
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [updated, setupdated] = useState(false);
  const updateHandler = () => {
    setupdated(true);
  };

  const formik = useFormik({
    initialValues: {
      lastName: userInfo.lastName,
      firstName: userInfo.firstName,
      email: userInfo.email,
      bio: userInfo.bio,
    },
  });
  return (
    <>
      <Grid item lg={6} sx={{ pr: 1 }}>
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item lg={6} sx={{ mb: 3 }}>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item lg={12} sx={{ mb: 3 }}>
        <TextField
          name="label"
          label="Email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item lg={12} sx={{ mb: 3 }}>
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
          <Button variant="contained" color="primary" onClick={updateHandler}>
            Update
          </Button>
        )}
      </Grid>
    </>
  );
}

export default Setting;
