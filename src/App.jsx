import { Heading, Button, Box} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const App = () => {
  return(
    <>
      <Heading
        textAlign= "center"
      >
        This is a docuSign clone
      </Heading>
      <Box
        m = "0 auto"
      >
        <Button
          // m = "0 auto"
        >
          <a href='/login'>
            Login
          </a>
        </Button>
        <Button
          // m = "0 auto"
        >
          <a href='/docs'>
            Docs
          </a>
        </Button>
      </Box>
    </>
  )
}

export default App;