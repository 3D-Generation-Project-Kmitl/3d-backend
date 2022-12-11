import { Router, Request, Response } from 'express';
import upload from '../middleware/upload';
import { modelController } from '../controllers';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', [verifyToken, upload.fields([{ name: 'picture' }, { name: 'model' }])], modelController.create);
router.get('/', [verifyToken], modelController.getByUserId);
router.put('/:id', [verifyToken, upload.fields([{ name: 'picture' }, { name: 'model' }])], modelController.update);
router.delete('/:id', [verifyToken], modelController.remove);

export default router;