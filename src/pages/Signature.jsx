import React, { useRe, useRef, useState } from 'react';
import {Heading, Box, Button} from '@chakra-ui/react';
import SignatureCanvas from 'react-signature-canvas';

const Signature = () => {

    let signatureRef = useRef();
    const [signatureImage, setSignatureImage] = useState(null);

    const handleClear= () => {
        signatureRef.current.clear();
        setSignatureImage(null)
    }

    const convertToPNG = () => {
        if (signatureRef.current.isEmpty()) {
          alert('Please provide a signature');
          return;
        }
        const dataURL = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
        setSignatureImage(dataURL);
      };

    return(
        <>
            <Heading
                textAlign = "center"
            >
                Hi this is draw signature page
            </Heading>
            <Box
                // p = "2px"
                bg = "black"
                w = "fit-content"
                border = "4px solid pink"
            >
                <SignatureCanvas 
                    ref={signatureRef}
                    penColor='green'
                    canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} 
                />
            </Box>
                <Button
                    onClick = {convertToPNG}
                    colorScheme = "green"
                >
                    Save 
                </Button>
                <Button
                    onClick = {handleClear}
                    colorScheme= "yellow"
                >
                    Clear
                </Button>
                {signatureImage && <img src={signatureImage} alt="Signature" />}
        </>
    )
}

export default Signature;