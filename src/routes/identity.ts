import { identityController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { CreateIdentityRequestDTO, UpdateIdentityRequestDTO, AdminUpdateIdentityRequestDTO } from '../dtos/identity';
import { Router } from 'express';

const router = Router();

router.post('/', [verifyToken, validateRequest(CreateIdentityRequestDTO)], identityController.create);
router.get('/', [verifyToken], identityController.get);
router.put('/', [verifyToken, validateRequest(UpdateIdentityRequestDTO)], identityController.update);
router.put('/admin', [verifyToken, permit('ADMIN'), validateRequest(AdminUpdateIdentityRequestDTO)], identityController.adminUpdate);


export default router;