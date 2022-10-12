import { authController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { RegisterRequestDTO } from '../dtos/user';
import { Router } from 'express';

const router = Router();

router.post('/register', [validateRequest(RegisterRequestDTO)], authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/getAccessToken', authController.getAccessToken);
router.put('/updatePassword', [verifyToken], authController.updatePassword);

export default router;