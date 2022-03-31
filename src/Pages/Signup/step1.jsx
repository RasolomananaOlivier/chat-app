import React from "react";

import TextField from "@mui/material/TextField";
import {
  Box,
  Grid,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { validateSignup } from "./validation";

export default function Step1({
  handleComplete,
  activeStep,
  completed,
  getSignUp,
}) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
    },
    validate: (values) => {
      return validateSignup(values);
    },
    onSubmit: (values) => {
      /* TODO : api/post */
      handleComplete();
    },
  });
  /**
   * Return true if the firstName input was touched or
   * An errors occurs
   */
  const handleErrorFirstName = () => {
    return !!formik.touched.firstName && !!formik.errors.firstName;
  };

  /**
   * Return true if the lastName input was touched or
   * An errors occurs
   */
  const handleErrorLastName = () => {
    return !!formik.touched.lastName && !!formik.errors.lastName;
  };

  /**
   * Return true if the email input was touched or
   * An errors occurs
   */
  const handleErrorEmail = () => {
    return !!formik.touched.email && !!formik.errors.email;
  };
  return (
    <Stack>
      <Box sx={{ my: 4 }}>
        <Typography variant="body2">Step 1/3</Typography>
        <Typography variant="h4">Sign up</Typography>
      </Box>

      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item lg={6} sx={{ pr: 2, mb: 5 }}>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              required
              disabled={completed[activeStep] ? true : false}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={handleErrorFirstName() ? true : false}
              helperText={
                handleErrorFirstName() ? `${formik.errors.firstName}` : null
              }
            />
          </Grid>
          <Grid item lg={6} sx={{ pr: 2, mb: 5 }}>
            <TextField
              name="lastName"
              label="Last Name"
              fullWidth
              required
              disabled={completed[activeStep] ? true : false}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={handleErrorLastName() ? true : false}
              helperText={
                handleErrorLastName() ? `${formik.errors.lastName}` : null
              }
            />
          </Grid>
          <Grid item lg={6} sx={{ pr: 2, mb: 5 }}>
            <TextField
              name="birthday"
              label="Birthday"
              fullWidth
              required
              disabled={completed[activeStep] ? true : false}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item lg={6} sx={{ pr: 2, mb: 3 }}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              required
              disabled={completed[activeStep] ? true : false}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={handleErrorEmail() ? true : false}
              helperText={handleErrorEmail() ? `${formik.errors.email}` : null}
            />
          </Grid>{" "}
        </Grid>
        <Grid item lg={8} sx={{ pr: 2, mb: 3 }}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Accept terms and conditions"
          />
        </Grid>
        <Grid
          item
          lg={12}
          sx={{ display: "flex", justifyContent: "flex-end", mr: 2.6 }}
        >
          <Button
            variant="contained"
            type="submit"
            disabled={completed[activeStep] ? true : false}
            hidden
          >
            {completed[activeStep] ? "Completed" : "Next"}
          </Button>
        </Grid>
      </Box>
    </Stack>
  );
}