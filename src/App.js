import React, { useCallback, useState, useRef } from 'react';
import PdfPages from './components/PdfPages';
import '../src/CSS/App.css'
import { LazyDownloadPDFButton } from './components/LazyDownloadPDFButton ';
import './CSS/App.css'
import readExcel from './ReadExcel';
import BodyTableRow from './components/BodyTableRow';
import { useDropzone } from 'react-dropzone'
import useWindowSize from './resize';

function App() {
  const [show, setShow] = useState(false)
  const [excelData, setExcelData] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState([]);
  const [isSelectedFile, setIsSelectedFile] = useState(null);
  const { width, height } = useWindowSize()
  const [selectedFileName, setSelectedFileName] = useState('')
  const inputFile = useRef();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.xls',
    onDrop: useCallback((file) => {
      if (file !== undefined && file[0].name.split('.').pop() === 'xls') {
        inputFile.current.value = '';
        readExcel(file[0]).then((data) => { setExcelData(data) })
        setQrCodeUrl([])
        setIsSelectedFile(true)
        setSelectedFileName(file[0].name)
      } else {
        setIsSelectedFile(false)
      }
    }, []),
  })

  const SaveQrCodeUrl = () => {
    const qrCodeCanvas = document.querySelectorAll('canvas');
    var qrCodeDataUri = [];
    qrCodeCanvas?.forEach((canvas, index) => (qrCodeDataUri[index] = canvas.toDataURL('image/jpg', 0.3)))
    setQrCodeUrl(qrCodeDataUri)
    return qrCodeDataUri;
  }

  return (
    <div id="container" style={{ width: width, height: height, minHeight: '100%', minWidth: '100%', display: 'flex', flexDirection: 'column' }}>
      <div id="btn-container">
        <div style={{ display: 'flex', flexDirection: 'column', height: '80%', marginRight: 20, width: '30%' }}>
          <div className='inputBtn bottone'>
            <input ref={inputFile} style={{ color: 'white', fontFamily: 'inherit',fontSize:15 }} id="selector" type="file" accept='.xls' color='blue' onChange={(e) => {
              const file = e.target?.files[0];
              if (file !== undefined && file.name.split('.').pop() === 'xls') {
                readExcel(file).then((data) => { setExcelData(data) })
                setQrCodeUrl([])
                setIsSelectedFile(true)
                setSelectedFileName(file.name)
              } else {
                setIsSelectedFile(false)
              }
            }} />
          </div>
          <div id='dropzone' {...getRootProps()} style={isDragActive ? { backgroundColor: 'lightgray' } : null}>
            <input  {...getInputProps()} />
            {isDragActive ? <p>Rilascia</p> : <p>Trascina qui il file</p>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, justifyContent: 'space-between', height: '80%' }}>
          <div className='bottone'>
            <input disabled={!isSelectedFile} className='btn' value={show ? 'Nascondi anteprima Pdf' : 'Mostra anteprima Pdf'} type='button' onClick={() => {
              if (isSelectedFile === true) {
                if (qrCodeUrl.length < 1)
                  SaveQrCodeUrl()
                setShow(!show)
              }
            }} />
          </div>
          <LazyDownloadPDFButton SaveQrCodeUrl={SaveQrCodeUrl} disabled={!isSelectedFile} exceldata={excelData} />
        </div>

      </div>

      <div
        id="main-content"
        style={{ borderTopWidth: 2, borderTopStyle: 'solid', borderColor: 'gray', height: '68%', width: '100%' }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {
            (isSelectedFile === true && show === false) &&
            <div id="fileTitle" >
              <h3>{selectedFileName}</h3>
            </div>
          }

        </div>
        {isSelectedFile === false && <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10%' }}>{<h3>Seleziona un file con estensione: ".xls"</h3>}</div>}
        {show ? <PdfPages exceldata={excelData} qrCodeUrl={qrCodeUrl} /> : (isSelectedFile === true && <BodyTableRow excelData={excelData} />)}
      </div>

      <div id="footer" style={show ? { display: 'none' } : null}></div>
    </div >
  );
}

export default App;
