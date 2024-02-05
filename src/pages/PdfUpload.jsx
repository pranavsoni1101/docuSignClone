import { Box, Button, Heading, Input, Link, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';

const PdfUpload = () => {
    const [pdfs, setPdfs] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [message, setMessage] = useState("");
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [showPdf, setShowPdf] = useState(false); // State variable to control PDF visibility


    useEffect(() => {
        fetchPDFs();
      }, []);
    
      const fetchPDFs = async () => {
        try {
          const response = await axios.get('http://localhost:3000/pdfMulter/getAll');
          setPdfs(response.data);
        } catch (error) {
          console.error('Error fetching PDFs:', error);
          setErrorMessage('Error fetching PDFs');
        }
      };
    
      const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
      };

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0])
    }

    const handleFileUpload = async () => {
        if(!pdfFile){
            setMessage("Please Select a file");
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile);

        try {
            await axios.post('http://localhost:3000/pdfMulter/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage("File Uploaded Successfully");
        }
        catch(error){
            console.error("Error Uploading the file");
            setMessage("An error occured while uploading the file, please try again")
        }
    }
    const handleClosePdf = () => {
        setShowPdf(!showPdf); // Hide PDF on button click
      };
    
    const handleViewPdf = (pdf) => {
        setSelectedPdf(pdf);
      };

      const handleDeletePdf = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/pdfMulter/deleteFile/${id}`);
          // Refresh the list of PDFs after deletion
          fetchPDFs();
          // If the deleted PDF is currently being viewed, close the PDF viewer
          if (selectedPdf && selectedPdf._id === id) {
            setSelectedPdf(null);
          }
        } catch (error) {
          console.error('Error deleting PDF:', error);
        //   setErrorMessage('Error deleting PDF');
        }
      };

    return(
        <>
            <Heading>View all pdf</Heading>
            {pdfs.map((pdf) => (
                <div key={pdf._id}>
                <p>{pdf.name}</p>
                <Button onClick={() => handleViewPdf(pdf)}>View PDF</Button>
                <Button
                    colorScheme='red'
                    onClick={() => handleDeletePdf(pdf._id)}
                >
                    Delete
                </Button>
                <Button
                    as = {Link}
                    href={`/pdfUpload/${pdf._id}`}
                    colorScheme='blue'
                >
                    Edit pdf
                </Button>
                </div>
            ))}
            {selectedPdf && (
                <div>
                <Document
                    file={`http://localhost:3000/pdfMulter/findOne/${selectedPdf._id}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
                </div>
            )}
            {/* {pdfs.map((pdf) => (
            <div key={pdf._id}>
            <p>{pdf.name}</p>
            <Document
                file={`http://localhost:3000/pdfMulter/findOne/${pdf._id}`}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            </div>
        ))} */}
        <p>Page {pageNumber} of {numPages}</p>
            <Heading>
                Upload PDF to Mongo Db with a simple click
            </Heading>
            <Box
                boxSize='md'
            >
                <form>
                    <Input 
                        type='file'
                        onChange={handleFileChange}
                        placeholder='upload from pc'
                    />
                    <Button
                        onClick={handleFileUpload}
                    >
                        Upload
                    </Button>
                </form>
                {message && <Text>{message}</Text>}
            </Box>
        </>
    )
}

export default PdfUpload;