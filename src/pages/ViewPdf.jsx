import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';

const ViewPdf = () => {
  const [pdfs, setPdfs] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/uploads/pdfs');
      setPdfs(response.data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      setErrorMessage('Error fetching PDFs');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <h2>All PDFs</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {pdfs.map((pdf) => (
        <div key={pdf._id}>
          <p>{pdf.name}</p>
          <Document
            file={`http://localhost:3000/uploads/pdf/${pdf._id}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      ))}
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
};

export default ViewPdf;
