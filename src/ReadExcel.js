import * as XLXS from 'xlsx'
const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLXS.read(bufferArray, { type: 'buffer' }); //specify the workbook
        const wsname = wb.SheetNames[0];  //tipologia di Worksheet
        const ws = wb.Sheets[wsname]
        const data = XLXS.utils.sheet_to_json(ws);
        resolve(data)

      };
      fileReader.onerror = (error) => {
        reject(error)
      };
    });
  };

export default readExcel;