import { userController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import upload from '../middleware/upload';
import { Router } from 'express';

const router = Router();

router.get('/admin', [verifyToken, permit('ADMIN')], userController.adminGetUsersWithIdentity);
router.patch('/admin/ban', [verifyToken, permit('ADMIN')], userController.adminBanUser);
router.patch('/admin/unBan', [verifyToken, permit('ADMIN')], userController.adminUnBanUser);
router.get('/count', [verifyToken, permit("ADMIN")], userController.countUsers);
router.get('/all', [verifyToken, permit('ADMIN')], userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/', [verifyToken, upload.single('picture')], userController.update);
router.delete('/:id', [verifyToken], userController.remove);

export default router;