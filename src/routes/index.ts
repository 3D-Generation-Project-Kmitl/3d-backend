import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import identityRouter from './identity';
import productRouter from './product';
import categoryRouter from './category';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/identity', identityRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);


export default router;