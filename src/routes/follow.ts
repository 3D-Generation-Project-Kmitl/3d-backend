import { followController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/follows/:id', [verifyToken], followController.getFollows);
router.get('/followers', [verifyToken], followController.getFollowers);
router.get('/following', [verifyToken], followController.getFollowing);
router.post('/:id', [verifyToken], followController.followUser);
router.delete('/unFollow/:id', [verifyToken], followController.unFollowUser);

export default router;