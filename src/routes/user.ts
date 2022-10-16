import { userController } from '../controllers';
import { Router } from 'express';

const router = Router();

router.get('/users', userController.getUsers);

export default router;