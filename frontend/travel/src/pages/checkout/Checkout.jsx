import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {useIsAuthenticated} from "react-auth-kit";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const steps = ['Billing Data', 'Payment details', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();

    useEffect(() => {
        if(!isAuth()){
            navigate("/login");
        }
    },[])

    const handleNext = (e) => {
        e.preventDefault();
        setActiveStep(activeStep + 1);
    };

    const handleBack = (e) => {
        e.preventDefault();
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <Container className="border-success" component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined"  sx={{borderRadius:'1em', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper  activeStep={activeStep} sx={{ pt: 3, pb: 5  }}>
                        {steps.map((label) => (
                            <Step  key={label} sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: 'rgb(25, 135, 84)',
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: 'rgb(25, 135, 84)',
                                }
                            }}>
                                <StepLabel >{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button style={{color : "rgb(25, 135, 84)"}} onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button style={{backgroundColor : "rgb(25, 135, 84)"}}
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}