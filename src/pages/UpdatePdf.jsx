import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, render } from '@react-pdf/renderer';

const PDFGenerator = ({ name, age, address }) => {
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Name: {name}</Text>
          <Text>Age: {age}</Text>
          <Text>Address: {address}</Text>
        </View>
      </Page>
    </Document>
  );

  const pdfBlob = render(<MyDocument />).toBlob();

  const openPDF = () => {
    pdfBlob.then((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  };

  return (
    <div>
      <button onClick={openPDF}>Open PDF</button>
    </div>
  );
};

const UpdatePdf = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleGeneratePDF = () => {
    // Call API or perform any other necessary action to update data
    // For demonstration, just updating with dummy data
    setName('John Doe');
    setAge('30');
    setAddress('123 Main St');
  };

  return (
    <div>
      <button onClick={handleGeneratePDF}>Update PDF Data</button>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <PDFGenerator name={name} age={age} address={address} />
      </PDFViewer>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default UpdatePdf;
