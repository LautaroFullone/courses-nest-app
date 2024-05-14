import { diskStorage } from "multer";

export const storage = diskStorage({
    destination: './tmp',
    //destination: `${__dirname}/../tmp`,
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        const fileame = `${Date.now()}.${extension}`;
        cb(null, fileame);
    }
})