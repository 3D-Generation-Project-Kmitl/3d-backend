import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const dir = `./uploads/${file.fieldname}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname.replaceAll(' ', ''));
    },
})

const upload = multer({ storage })

export default upload;
