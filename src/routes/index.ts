import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import identityRouter from './identity';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/identity', identityRouter);

export default router;