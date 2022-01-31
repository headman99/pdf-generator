import React, { useEffect } from 'react';
import '../CSS/RowDetail.css'
import bwipjs from 'bwip-js';

const RowDetail = ({row}) => { 

    useEffect(()=>{
        try {
            console.log(row.GTIN)
            // The return value is the canvas element
            let canvas = bwipjs.toCanvas(row.GTIN.toString(),{
                    bcid:        'datamatrix',       // Barcode type
                    text:        row.КодМаркировки,    // Text to encode
                    scale:       8,               // 3x scaling factor
                    height:      10,              // Bar height, in millimeters
                    width:       10,
                    includetext: true,            // Show human-readable text
                    textxalign:  'center',        // Always good to set this
                });
        } catch (e) {
            // `e` may be a string or Error object
        }
    },[])
    
    return (
        <div id='row-container'>
            <div id='flexContainer'>
                <div id="sinistro" style={style}>
                    <div className='row-text' style={{fontSize:'1.1vw'}}>
                        <p>{row.Номенклатура.split('.')[1].split(',')[0]} &nbsp;&nbsp;{row.Номенклатура.split('.')[0].split(' ')[0] + ' ('+ row.Номенклатура.split('.')[2] + ' )'}</p>  
                    </div>
                    <div style={{fontWeight:'bold',fontSize:'1.5vw'}}>
                        <p>{row.GTIN}</p>
                    </div>
                    <div style={{fontSize:'1.1vw'}}>
                        <p>{`(${row.КодМаркировки.substr(0,2)})${row.КодМаркировки.substr(2,14)}(${row.КодМаркировки.substr(16,2)})${row.КодМаркировки.substr(18,13)}`}</p>     
                    </div>   
                </div >
                <div id='right'>
                   <canvas id={row.GTIN.toString()}></canvas>
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
