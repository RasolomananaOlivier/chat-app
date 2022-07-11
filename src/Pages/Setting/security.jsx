import { Button, Grid, Stack, TextField } from "@mui/material";
import SecurityIllustration from "../../Assets/img/security.jpg";
import { useFormik } from "formik";
import { validatePasswordUpdating } from "../Signup/validation";
import updatePassword from "../../Services/Api/updatePassword";
import { useSelector } from "react-redux";

export default function Security() {
    const user = useSelector((state) => state.user);
    const formik = useFormik({
        initialValues: {
            oldPass: "",
            newPass: "",
            validatePass: "",
        },
        validate: (values) => validatePasswordUpdating(values),
        onSubmit: async (values) => {
            const data = {
                userId: user._id,
                oldPass: values.oldPass,
                newPass: values.newPass,
            };
            const response = await updatePassword(data);
            console.log(response);
            /**
             * TODO: send notification that the update was successful or not
             */
        },
    });
    return (
        <>
            <Grid item lg={6}>
                <img
                    src={SecurityIllustration}
                    alt=""
                    srcset=""
                    style={{
                        maxWidth: 350,
                        width: '100%',
                        minWidth: 250
                    }}

                    height={360}
                />
            </Grid>
            <Grid item lg={6}>
                <Stack spacing={3} component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Current password"
                        fullWidth
                        name="oldPass"
                        error={
                            formik.touched.oldPass && formik.errors.oldPass ? true : false
                        }
                        onChange={formik.handleChange}
                        value={formik.values.oldPass}
                        helperText={
                            formik.touched.oldPass && formik.errors.oldPass
                                ? formik.errors.oldPass
                                : null
                        }
                    />

                    <TextField
                        label="New password"
                        fullWidth
                        name="newPass"
                        onChange={formik.handleChange}
                        value={formik.values.newPass}
                        error={
                            formik.touched.newPass && formik.errors.newPass ? true : false
                        }
                        helperText={
                            formik.touched.oldPass && formik.errors.newPass
                                ? formik.errors.newPass
                                : null
                        }
                    />

                    <TextField
                        label="Type it again"
                        fullWidth
                        name="validatePass"
                        onChange={formik.handleChange}
                        value={formik.values.validatePass}
                        error={
                            formik.touched.validatePass && formik.errors.validatePass
                                ? true
                                : false
                        }
                        helperText={
                            formik.touched.validatePass && formik.errors.validatePass
                                ? formik.errors.validatePass
                                : null
                        }
                    />

                    <Grid
                        item
                        display="flex"
                        alignItems="end"
                        justifyContent="flex-end"
                        lg={12}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={formik.handleSubmit}
                        >
                            Change Password
                        </Button>
                    </Grid>
                </Stack>
            </Grid>
        </>
    );
}
