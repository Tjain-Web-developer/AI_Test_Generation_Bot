import fs from 'fs';
import path from 'path';
import pdfparse from 'pdf-parse';
import generateEmbeddings from './genEmbeddings.js';


const currentModuleURL = new URL(import.meta.url);
const currentModuleDirectory = path.dirname(currentModuleURL.pathname);

let count = 0;

const extractInformation = async (path) => {
  let dataBuffer = fs.readFileSync(path);
  
  const res = await pdfparse(dataBuffer);
  const embed = await generateEmbeddings(res.text)

  // const pdfFilePath = path.join(currentModuleDirectory, 'fileUploads/pdfFiles-1703937812955-768055956.pdf');
  // console.log('\n\n\n'+pdfFilePath+'\n\n\n\n')
  // new PdfReader().parseFileItems(pdfFilePath, (err, item) => {
  //   if (err) {
  //     console.error('Error:', err);
  //   } else if (!item) {
  //     console.warn('End of file');
  //   } else if (item.text) {
  //     console.log(item.text);
  //   }
  // });

  // let txt;
  // new PdfReader().parseFileItems("utils/sample.pdf", (err, item) => {
  //   if (err) console.error("error:", err);
  //   else if (!item) console.warn("end of file");
  //   else if (item.text){ 
  //     txt = item.text;
  //     console.log(txt)
  //   }
  // });

  return {
    embed: embed,
    text: res.text
  }
};

export default extractInformation;
