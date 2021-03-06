import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import React from 'react';
import PdfDocument from './PdfDocument';

export const LazyDownloadPDFButton = ({SaveQrCodeUrl,exceldata,disabled}) => {
    return (
        <button 
            style={disabled?{display:'none'}:{display:'block'}}
            className='btn'
            onClick={async () => {
                const qrCodeUrl = SaveQrCodeUrl()
                const doc = <PdfDocument exceldata={exceldata} qrCodeUrl={qrCodeUrl} />
                const asPdf = pdf([]); //deve essere vuoto
                asPdf.updateContainer(doc);
                const blob = await asPdf.toBlob();
                saveAs(blob, 'document.pdf');
            }}
        >Download PDF</button>
    );
}