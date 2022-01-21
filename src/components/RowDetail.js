import React from 'react';
import '../CSS/RowDetail.css'
import QRCode from "qrcode.react";


const RowDetail = ({ row }) => {
    return (
        <div id='row-container'>
            <div id='flexContainer'>
                <div id="sinistro" style={style}>
                    <div className='row-text' style={{fontSize:'0.9vw'}}>
                        <p>{row.Номенклатура.split('.')[1].split(',')[0]} &nbsp;&nbsp;{row.Номенклатура.split('.')[0].split(' ')[0] + ' ('+ row.Номенклатура.split('.')[2] + ' )'}</p>  
                    </div>
                    <div style={{fontWeight:'bold',fontSize:'1.5vw'}}>
                        <p>{row.GTIN}</p>
                    </div>
                    <div style={{fontSize:'0.9vw'}}>
                        <p>{`(${row.КодМаркировки.substr(0,2)})${row.КодМаркировки.substr(2,14)}(${row.КодМаркировки.substr(16,2)})${row.КодМаркировки.substr(18,13)}`}</p>
                        
                    </div>   
                </div >
                <div id='right'>
                    <QRCode style={{ width: 170, height: 170 }} id={row.КодМаркировки} value={row.КодМаркировки} renderAs='canvas' />
                </div>
            </div>
        </div>
    );
};

const style = {
    gap:'30px',
    display: 'flex',
    flexDirection: 'column',
};



export default RowDetail;
