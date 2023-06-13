import React from 'react';
import {
    Box, Container, Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber, Stepper,
    StepSeparator,
    StepStatus,
    StepTitle, useSteps
} from "@chakra-ui/react";

interface StepWrapperProps {
    step: number;
    children: React.ReactNode
}

const steps = [
    { title: 'First', description: 'Track info' },
    { title: 'Second', description: 'Upload poster' },
    { title: 'Third', description: 'Upload audio' },
]

const StepWrapper: React.FC<StepWrapperProps> = ({step, children}) => {
    return (
        <Container>
            <Stepper index={step}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            {children}
        </Container>
    );
};

export default StepWrapper;
