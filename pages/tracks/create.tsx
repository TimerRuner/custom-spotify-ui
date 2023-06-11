import React, {useState} from 'react';
import MainLayout from "../../layout/MainLayout";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import {useRouter} from "next/router";
import TrackService from "../../services/TrackService";
import {
    Flex,
    Text,
    Input,
    Button,
    useSteps,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepIcon, StepNumber, Box, StepTitle, StepDescription, StepSeparator
} from "@chakra-ui/react";

const Create = () => {
    const [step, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const steps = [
        { title: 'First', description: 'Track info' },
        { title: 'Second', description: 'Upload poster' },
        { title: 'Third', description: 'Upload audio' },
    ]

    const next = () => {
        if (step !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            TrackService.createTrack(formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    const { activeStep } = useSteps({
        index: step,
        count: steps.length,
    })

    return (
        <MainLayout>
            <Stepper index={activeStep}>
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
            {step === 0 &&
                <Flex flexDirection={"column"} style={{padding: 20}}>
                    <Text>Track Name</Text>
                    <Input
                        {...name}
                    />
                    <Text>Artist Name</Text>
                    <Input
                        {...artist}
                    />
                    <Text>Track Text</Text>
                    <Input
                        {...text}
                    />
                </Flex>
            }
            {step === 1 &&
                <FileUpload setFile={setPicture} accept="image/*">
                    <Button>Upload poster</Button>
                </FileUpload>
            }
            {step === 2 &&
                <FileUpload setFile={setAudio} accept="audio/*">
                    <Button>Upload audio</Button>
                </FileUpload>
            }
            <Flex justifyContent='space-between'>
                <Button disabled={step === 0} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Flex>
        </MainLayout>
    );
};

export default Create;
