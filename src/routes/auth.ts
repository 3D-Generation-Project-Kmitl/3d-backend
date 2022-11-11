import { authController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { RegisterRequestDTO, LoginRequestDTO, UpdatePasswordRequestDTO } from '../dtos/user';
import { Router } from 'express';

const router = Router();

router.post('/register', [validateRequest(RegisterRequestDTO)], authController.register)
router.post('/login', [validateRequest(LoginRequestDTO)], authController.login)
router.post('/logout', [verifyToken], authController.logout)
router.post('/getAccessToken', authController.getAccessToken);
router.put('/updatePassword', [verifyToken, validateRequest(UpdatePasswordRequestDTO)], authController.updatePassword);
router.post('/validateToken', authController.validateToken);
export default router;