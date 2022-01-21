import React from 'react';
import { Document} from "@react-pdf/renderer"
import PdfPage from './PdfPage';


const PdfDocument = ({ exceldata, qrCodeUrl }) => {
    return (
        <Document>
            {
                exceldata.map((data, index) => (
                    <PdfPage key={index} data={data} qrcode={qrCodeUrl[index]} />
                ))
            }
        </Document>

    );
}

export default PdfDocument;