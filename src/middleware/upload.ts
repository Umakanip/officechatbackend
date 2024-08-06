import multer from 'multer';
import path from 'path';
console.log('enter middleware')


// Define storage options
const storage = multer.memoryStorage();  // Store files in memory for processing

// Define upload middleware with a 10 MB limit
const uploadLogo = multer({ 
  storage, 
  limits: { fileSize: 10 * 1024 * 1024 }  // 10 MB limit
});


const excelFilter:any = (req:Request, file:any, cb:any) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

let importstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname, '../public/'))
  },  
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-leads-${file.originalname}`);
  },
});

let uploadFile = multer({ storage: importstorage, fileFilter: excelFilter });


export default {uploadLogo,uploadFile};