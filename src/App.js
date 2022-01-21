import React, { useState } from 'react';
import PdfPages from './components/PdfPages';
import RowDetail from './components/RowDetail';
import '../src/CSS/App.css'
import { LazyDownloadPDFButton } from './components/LazyDownloadPDFButton ';
import './CSS/App.css'
import readExcel from './ReadExcel';

function App() {
  const [show, setShow] = useState(false)
  const [excelData, setExcelData] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState([]);
  const [isSelectedFile, setIsSelectedFile] = useState(null);

  return (
    <div id="container" style={{ width: '100%', height: '100%', minHeight: '100%', minWidth: '100%' }}>
      <div id="btn-container" >
        <input disabled={!isSelectedFile} className='btn' value={show ? 'Nascondi anteprima Pdf' : 'Mostra anteprima Pdf'} type='button' onClick={() => {
          if (isSelectedFile === true) {
            const qrCodeCanvas = document.querySelectorAll('canvas');
            var qrCodeDataUri = [];
            qrCodeCanvas?.forEach((canvas, index) => (qrCodeDataUri[index] = canvas.toDataURL('image/jpg', 0.3)))
            setQrCodeUrl(qrCodeDataUri)
            setShow(!show)
          }

        }} />
        <input className='btn' type="file" accept='.xls' color='blue' onChange={(e) => {
          const file = e.target.files[0];
          if (file.name.split('.').pop() === 'xls') {
            readExcel(file).then((data)=>setExcelData(data))
            setIsSelectedFile(true)
          } else {
            setIsSelectedFile(false)
          }
        }} />
        <LazyDownloadPDFButton disabled={!isSelectedFile} exceldata={excelData} qrCodeUrl={qrCodeUrl} />
      </div>

      <div id="main-content" style={{ borderTopWidth: 2, borderTopStyle: 'solid', borderColor: 'gray' }}>
        {isSelectedFile === false && <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><span>Seleziona un file con estensione: ".xls"</span></div>}
        {show ? <PdfPages exceldata={excelData} qrCodeUrl={qrCodeUrl} /> : (isSelectedFile === true && excelData.map(data => <RowDetail row={data} />))}
      </div>
      <div id="footer"></div>
    </div >
  );
}

export default App;