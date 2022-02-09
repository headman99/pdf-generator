import React, { useCallback, useState,useRef } from 'react';
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
  const [selectedFileName,setSelectedFileName] = useState('')
  const inputFile = useRef();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.xls',
    onDrop: useCallback((file) => {
      if (file!==undefined && file[0].name.split('.').pop() === 'xls') {
        setSelectedFileName(file[0].name)
        inputFile.current.value=''
        readExcel(file[0]).then((data) => { setExcelData(data) })
        setQrCodeUrl([])
        setIsSelectedFile(true)
      } else {
        setIsSelectedFile(false)
      }

    }, [])
  })

  const SaveQrCodeUrl = () => {
    const qrCodeCanvas = document.querySelectorAll('canvas');
    var qrCodeDataUri = [];
    qrCodeCanvas?.forEach((canvas, index) => (qrCodeDataUri[index] = canvas.toDataURL('image/jpg', 0.3)))
    setQrCodeUrl(qrCodeDataUri)
    return qrCodeDataUri;
  }

  return (
    <div id="container" style={{ width: width, height: height, minHeight: '100%', minWidth: '100%',display:'flex',flexDirection:'column' }}>
      <div id="btn-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 180, minWidth: 1000, height: '20%', width: '100%' }}>
        <input disabled={!isSelectedFile} className='btn' value={show ? 'Nascondi anteprima Pdf' : 'Mostra anteprima Pdf'} type='button' onClick={() => {
          if (isSelectedFile === true) {
            if (qrCodeUrl.length < 1)
              SaveQrCodeUrl()
            setShow(!show)
          }
        }} />
        <input ref={inputFile} id="selector" className='btn' type="file" accept='.xls' color='blue' onChange={(e) => {
          const file = e.target?.files[0];
          if (file!==undefined && file.name.split('.').pop() === 'xls') {
            setSelectedFileName(file.name)
            readExcel(file).then((data) => { setExcelData(data) })
            setQrCodeUrl([])
            setIsSelectedFile(true)
          } else {
            setIsSelectedFile(false)
          }
        }} />
        <LazyDownloadPDFButton SaveQrCodeUrl={SaveQrCodeUrl} disabled={!isSelectedFile} exceldata={excelData} />
      </div>
      <div id = "fileTitle">
        <h3>{selectedFileName}</h3>
      </div>
      <div
        id="main-content"
        style={{ borderTopWidth: 2, borderTopStyle: 'solid', borderColor: 'gray', height: '78%', width: '100%' }}
      >
        <div id='dropzone' {...getRootProps()}>
          <input  {...getInputProps()} />
          <div id="curtain" style={isDragActive?{opacity:0.4,backgroundColor:'lightgray',zIndex:5}:(isSelectedFile?{opacity:0}:null)}>
            {isDragActive ? <p>Rilascia</p> : <p>Trascina qui il file</p>}
          </div>
          {isSelectedFile === false && <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><span>Seleziona un file con estensione: ".xls"</span></div>}
          {show ? <PdfPages exceldata={excelData} qrCodeUrl={qrCodeUrl} /> : (isSelectedFile === true && <BodyTableRow excelData={excelData} />)}
        </div>
      </div>

      <div id="footer" style={show ? { display: 'none' } : null}></div>
    </div >
  );
}

export default App;
