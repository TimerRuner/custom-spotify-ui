import React, {useRef} from 'react';
import {Box} from "@chakra-ui/react";

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children: React.ReactNode
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }

    return (
        <Box onClick={() => ref.current.click()}>
            <input
                type="file"
                accept={accept}
                style={{display: "none"}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </Box>
    );
};

export default FileUpload;
