import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import { Box, Button, Container, FormLabel, Heading, Image, Input, InputGroup, Text } from '@chakra-ui/react';

const Signature= () => {
  const signatureRef = useRef(null);
  const [signatures, setSignatures] = useState([]);
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const[textSignature, setTextSignature] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setType("upload");
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      // Clear existing signature before setting background image
      signatureRef.current.clear();
      // Set background image
      signatureRef.current.fromDataURL(imageDataUrl);
    };
    reader.readAsDataURL(file);
  };


  useEffect(()=>{
        fetchSignatures();
        // console.log(response.data);
  },[]);

  const fetchSignatures =  () =>{
    axios.get("http://localhost:3000/signature/getAll")
    .then((response) =>{
        setSignatures(response.data)})
    .catch((err) => console.log(err))
  }

  const handleSave = async () => {
    const signatureDataUrl = signatureRef.current.toDataURL(); // Get signature as data URL
    const signatureBlob = await fetch(signatureDataUrl).then(res => res.blob()); // Convert data URL to Blob
    const formData = new FormData();
    formData.append('signature', signatureBlob, fileName);
    formData.append('type', type || 'draw'); // Append the type information
    try {
      await axios.post('http://localhost:3000/signature/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
      setFileName("");
      signatureRef.current.clear();
      console.log('Signature uploaded successfully');
      fetchSignatures();
    } catch (error) {
      console.error('Error uploading signature:', error);
    }
  };

  const handleClear = () => {
    signatureRef.current.clear();
    setFileName("");
  }

  const handleTextSignature = (event) => {
    setTextSignature(event.target.value);
  }
  const handleDeleteSignature = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/signature/deleteSignature/${id}`);
        // Refresh the list of PDFs after deletion
      fetchSignatures();
     } catch (error) {
      console.error('Error deleting Signature:', error);
    }
  };

  const handleChange = (event) => {
    setFileName(event.target.value);
  }

  const handleAddText = async() => {
    const blob = new Blob([textSignature], { type: "text/plain" });
    const formData = new FormData();
    formData.append('signature', blob, `${textSignature} signature`);
    formData.append('type', "text");
    try {
            await axios.post('http://localhost:3000/signature/upload', formData)
            .then(response=>{
                console.log("Successfully added text signature");
                fetchSignatures();
            })
            .catch((err) => console.log("Error saving text signature", err))
        }
    catch (err){
        console.log("There has been an error", err);
    }
  };

  return (
    <>
        <Heading
            textAlign="center"
        >
            Upload Signatures
        </Heading>
        <Container
            // m = "0 auto"
            mt = "1em"
        >
                <InputGroup>
                    <FormLabel>Upload signature</FormLabel>
                    <Input 
                        type='file'
                        onChange={handleFileChange}
                        accept="image/png"
                    />
                </InputGroup>
                <Heading
                    textAlign= "center"
                    mb = "1em"
                >
                    OR
                </Heading>
            <Box
                w = "fit-content"
                // m = "0 auto"
                border= "1px solid black"
            >
                <SignatureCanvas ref={signatureRef} />
            </Box>
            <Heading
                textAlign= "center"
                mb = "1em"
            >
                OR
            </Heading>
            <InputGroup>
                <FormLabel>Signature in Text</FormLabel>
                <Input 
                    type='text'
                    placeholder='Type to Sign'
                    onChange={handleTextSignature}
                    value={textSignature}
                />
                <Button
                    onClick={handleAddText}
                    colorScheme='green'
                >
                    Upload
                </Button>
            </InputGroup>
            <InputGroup>
                <FormLabel>Enter FileName</FormLabel>
                <Input 
                    type='text'
                    onChange={handleChange}
                    value = {fileName}
                    placeholder='Type in file name'
                />
            </InputGroup>
            
                <Button 
                    mt = "1em"
                    colorScheme='green'
                    onClick={handleSave}
                >
                    Save Signature
                </Button>
                <Button 
                    mt = "1em"
                    colorScheme='yellow'
                    onClick={handleClear}
                >
                    Clear
                </Button>    
                {signatures.map((signature, index) => (
                    <Box 
                        key={index} 
                        style={{ marginBottom: '20px' }}
                        bg = "pink"
                    >
                        <Heading>{signature.name}</Heading>
                        {/* <Image src={`data:image/png;base64,${arrayBufferToBase64(signature.data.data)}`} alt={signature.name} /> */}
                        {signature.type === "draw"|| signature.type === "upload"?
                            <Image src={`data:image/png;base64,${signature.data}`} alt={signature.name} />
                            :   
                            <Text>{atob(signature.data)}</Text>
                        }
                        <Text>Category: {signature.type}</Text>
                        <Button
                            colorScheme='red'
                            onClick={()=>handleDeleteSignature(signature._id)}
                        >
                            Delete Signature
                        </Button>
                        {/* <Image src={`data:image/png;base64,${signature.data}`} alt={signature.name} /> */}
                    </Box>
                ))}  
        </Container>
    
    </>
  );
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export default Signature;
