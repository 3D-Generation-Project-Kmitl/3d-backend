import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import identityRouter from './identity';
import productRouter from './product';
import categoryRouter from './category';
import modelRouter from './model';
import cartRouter from './cart';
import favoriteRouter from './favorite';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/identity', identityRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/model', modelRouter);
router.use('/cart', cartRouter);
router.use('/favorite', favoriteRouter);


export default router;