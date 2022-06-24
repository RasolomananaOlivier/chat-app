import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Background from "../../Assets/img/login-background.jpg";
import { useFormik } from "formik";
import { validateLogin } from "../Signup/validation";
import { login } from "../../Services/Api/login";
import { useDispatch } from "react-redux";
import { updateAllUserData } from "../../Services/Data/infoSlice";
import { useNavigate } from "react-router-dom";
import { fetchingTheFriendsCollections } from "../../Services/Data/friendscollectionsSlice";
import { fetchNotificationsFromTheServer } from "../../Services/Data/notificationSlice";
import { fetchRequestFromTheServer } from "../../Services/Data/requestSlice";
import { motion } from "framer-motion";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",

      email: "",
    },
    validate: (values) => {
      return validateLogin(values);
    },
    onSubmit: (values) => {
      login(values)
        .then((response) => {
          console.log(response);
          if (response.isRegistered) {
            dispatch(updateAllUserData(response.user));
            dispatch(
              fetchingTheFriendsCollections(response.user.friendsCollections)
            );
            dispatch(
              fetchNotificationsFromTheServer(
                response.user.notificationsCollections
              )
            );
            dispatch(fetchRequestFromTheServer(response.user.requests));
            navigate("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <motion.div>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", overflowY: "hidden" }}
        >
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7}>
            <img
              src={Background}
              style={{ height: "100vh" }}
              alt=""
              srcset=""
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched && formik.errors.email
                      ? `${formik.errors.email}`
                      : null
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched && formik.errors.password
                      ? `${formik.errors.password}`
                      : null
                  }
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>{" "}
      </motion.div>
    </ThemeProvider>
  );
}
