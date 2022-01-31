import React from 'react';
import RowDetail from './RowDetail';

const BodyTableRow = ({excelData}) => {
    return (
        <div>{
            excelData.map(data => <RowDetail row={data} />)
            }
        </div>
    )
};

export default BodyTableRow;
