import { Request } from 'express';

const filePath2FullURL = (req: Request) => {
    if (req.file) {
        const path = req.file?.path.replaceAll('\\', '/');
        if (path === undefined) return null;
        const url = req.protocol + '://' + req.get('host') + ':443/' + path;
        return url;
    }
    if (req.files) {
        const files: any = req.files;
        const results: any = {};
        for (var key in files) {
            const file = files[key][0] as Express.Multer.File;
            const path = file.path.replaceAll('\\', '/');
            if (path === undefined) return null;
            const url = req.protocol + '://' + req.get('host') + ':443/' + path;
            results[file.fieldname] = url;
        }
        return results;
    }
    return null;
}

export default filePath2FullURL;
