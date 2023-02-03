import { identityController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { Router } from 'express';
import upload from '../middleware/upload';

const router = Router();

router.post('/', [verifyToken, upload.fields([{ name: 'cardPicture' }, { name: 'cardFacePicture' }])], identityController.create);
router.get('/', [verifyToken], identityController.get);
router.put('/', [verifyToken, upload.fields([{ name: 'cardPicture' }, { name: 'cardFacePicture' }])], identityController.update);
router.put('/admin', [verifyToken], identityController.adminUpdate);


export default router;