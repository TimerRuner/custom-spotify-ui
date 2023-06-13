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
} from "@chakra-ui/react";
import StepWrapper from "../../components/StepWrapper";

const Create = () => {
    const [step, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

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

    return (
        <MainLayout>
            <StepWrapper step={step}>
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
            </StepWrapper>
        </MainLayout>
    );
};

export default Create;
