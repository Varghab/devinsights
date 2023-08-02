const DatauriParser = require('datauri/parser');
const path = require('path');

const getDataUri = (file) => {
  
  try {
    const parser = new DatauriParser();
    const extName = path.extname(file.originalname).toString();
    const formated = parser.format(extName, file.buffer);
    return {success:true, formated};
  } catch (error) {
    return {success:false, error:error}
  }
};

module.exports = { getDataUri };