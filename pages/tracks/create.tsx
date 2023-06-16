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
    useSteps, Card, InputGroup,
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
            <Flex justifyContent="center" alignItems="center">
                <Card width="auto" display="inline-block" p={4}>
                    <StepWrapper step={step}>
                        {step === 0 &&
                            <Flex flexDirection={"column"} style={{padding: 20}}>
                                <InputGroup mb={3}>
                                    <Text>Track Name</Text>
                                    <Input
                                        {...name}
                                    />
                                </InputGroup>
                                <InputGroup mb={3}>
                                    <Text>Artist Name</Text>
                                    <Input
                                        {...artist}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Text>Track Text</Text>
                                    <Input
                                        {...text}
                                    />
                                </InputGroup>
                            </Flex>
                        }
                        {step === 1 &&
                            <FileUpload setFile={setPicture} accept="image/*">
                                <Flex alignItems="center" flexDirection="column" justifyContent="center" p={3}>
                                    <Text color="black" mb={2}>{picture?.name}</Text>
                                    <Button>Upload poster</Button>
                                </Flex>
                            </FileUpload>
                        }
                        {step === 2 &&
                            <FileUpload setFile={setAudio} accept="audio/*">
                                <Flex alignItems="center" flexDirection="column" justifyContent="center" p={3}>
                                    <Text color="black" mb={2}>{audio?.name}</Text>
                                    <Button>Upload audio</Button>
                                </Flex>
                            </FileUpload>
                        }
                        <Flex justifyContent='space-between'>
                            <Button isDisabled={step === 0} onClick={back}>Back</Button>
                            <Button onClick={next}>Next</Button>
                        </Flex>
                    </StepWrapper>
                </Card>
            </Flex>
        </MainLayout>
    );
};

export default Create;
