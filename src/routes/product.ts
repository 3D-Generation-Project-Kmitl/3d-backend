import { identityController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { Router } from 'express';

const router = Router();


export default router;