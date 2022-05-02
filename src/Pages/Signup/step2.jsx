import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTheUserPasswd } from "../../Services/Data/infoSlice";
import { validatePassword } from "./validation";

export default function Step2({ handleComplete, completed, activeStep }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmedPassword: "",
    },
    validate: (values) => {
      return validatePassword(values);
    },
    onSubmit: (values) => {
      let state = { passwd: values.confirmedPassword };
      dispatch(updateTheUserPasswd(state));
      handleComplete();
    },
  });
  return (
    <Stack>
      <Box sx={{ my: 4 }}>
        <Typography variant="body2">Step 2/3</Typography>
        <Typography variant="h4">Password</Typography>
      </Box>
      <Grid
        container
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ pr: 2 }}
      >
        <Grid item lg={12} sx={{ mb: 5 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              disabled={completed[activeStep] ? true : false}
            >
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              // Error

              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              disabled={completed[activeStep] ? true : false}
              // Handler
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              // Icon
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              id="outlined-weight-helper-text"
            >
              {formik.touched.password && formik.errors.password
                ? `${formik.errors.password}`
                : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item lg={12} sx={{ mb: 5 }}>
          <TextField
            label="Confirm the password"
            name="confirmedPassword"
            type="password"
            required
            fullWidth
            disabled={completed[activeStep] ? true : false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmedPassword &&
              formik.errors.confirmedPassword
                ? true
                : false
            }
            helperText={
              formik.touched.confirmedPassword &&
              formik.errors.confirmedPassword
                ? `${formik.errors.confirmedPassword}`
                : null
            }
          />
        </Grid>
        <Grid lg={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            type="submit"
            disabled={completed[activeStep] ? true : false}
          >
            {completed[activeStep] ? "Completed" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
}
