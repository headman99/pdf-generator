import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import React from 'react';
import PdfDocument from './PdfDocument';

export const LazyDownloadPDFButton = ({ exceldata, qrCodeUrl,disabled}) => {
    return (
        <button 
            style={disabled?{visibility:'hidden'}:{display:'block'}}
            className='btn'
            onClick={async () => {
                const doc = <PdfDocument exceldata={exceldata} qrCodeUrl={qrCodeUrl} />
                const asPdf = pdf([]); //deve essere vuoto
                asPdf.updateContainer(doc);
                const blob = await asPdf.toBlob();
                saveAs(blob, 'document.pdf');
            }}
        >Download PDF</button>
    );
}