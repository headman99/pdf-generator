import React from 'react';
import { PDFViewer, PDFDownloadLink, Document } from "@react-pdf/renderer"
import useWindowSize from '../resize';
import PdfDocument from './PdfDocument';


const PdfPages = ({ exceldata,qrCodeUrl}) => {
    const size = useWindowSize();
    return (
        <div>
            <PDFViewer style={{ width: size.width, height: size.height }}>
                <PdfDocument exceldata={exceldata} qrCodeUrl={qrCodeUrl} />
            </PDFViewer>
            <PDFDownloadLink document={<Document />} fileName="somename.pdf">
            </PDFDownloadLink>
        </div>
    )
};

export default PdfPages;
