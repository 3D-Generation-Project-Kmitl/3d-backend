import { identityController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { CreateIdentityRequestDTO, UpdateIdentityRequestDTO } from '../dtos/identity';
import { Router } from 'express';

const router = Router();

router.post('/', [verifyToken, validateRequest(CreateIdentityRequestDTO)], identityController.create);
router.get('/:id', [verifyToken], identityController.get);
router.put('/:id', [verifyToken, validateRequest(UpdateIdentityRequestDTO)], identityController.update);


export default router;