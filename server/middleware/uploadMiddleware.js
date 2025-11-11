import multer from "multer";
const Upload = multer({storage: multer.diskStorage({})})

export default Upload;