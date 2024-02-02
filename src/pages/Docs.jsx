import { Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Document, View, Page, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "black",
        color: "pink"
    },
    section: {
        flexGrow: 1
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
      },
})


const MyDocument = ( {text}) => {
    return(
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text>Helo</Text>
            </View>
            <View>
                <Text
                    style={styles.section}
                >
                    {text !== ""?text: "type in to fill pdf"}
                </Text>
            </View>
        </Page>
    </Document>)
    const pdfBlob = render(<MyDocument />).toBlob();
}

const Docs = () => {
    const [text, setText] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    }
    return(
        <>
            <Heading>
                This is documents
            </Heading>
            <Input
                type = "text"
                value = {text}
                onChange = {handleChange}
                placeholder = "Write pdf file"
            />
            <p>You are reading a pdf</p>
            <PDFViewer style={styles.viewer}>
                <MyDocument text={text} />
            </PDFViewer>
        </>
    )
}

export default Docs;