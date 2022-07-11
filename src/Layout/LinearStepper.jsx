import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Step1 from "../Pages/Signup/step1";
import Step2 from "../Pages/Signup/step2";
import Step3 from "../Pages/Signup/step3";
import { AnimatePresence } from "framer-motion";

const steps = ["Information", "Password", "Bio"];

export default function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.up("md"));

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    /**
     * TODO: retrieve the value when user get back
     */
    const handleStep = (step) => () => {
        setActiveStep(step);
        const newCompleted = completed;
        newCompleted[step] = false;
        setCompleted(newCompleted);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Grid container>
                <Grid
                    item
                    md={4}
                    lg={4}
                    sx={{
                        height: "100vh",
                        display: { xs: "none", md: "flex" },
                    }}
                    className="background-signup"
                ></Grid>

                <Grid
                    item
                    xs={12}
                    md={8}
                    lg={8}
                    sx={{ py: { xs: 2, lg: 5 }, px: { xs: 2, lg: 8 } }}
                >
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {mobile ? label : null}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>

                    <div>
                        {allStepsCompleted() ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <Box>
                                <Box sx={{ mt: 4, height: "25rem" }}>
                                    <AnimatePresence exitBeforeEnter>
                                        {activeStep === 0 ? (
                                            <Step1
                                                handleComplete={handleComplete}
                                                activeStep={activeStep}
                                                completed={completed}
                                            />
                                        ) : activeStep === 1 ? (
                                            <Step2
                                                handleComplete={handleComplete}
                                                activeStep={activeStep}
                                                completed={completed}
                                            />
                                        ) : (
                                            <Step3 />
                                        )}
                                    </AnimatePresence>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                </Box>
                            </Box>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}
