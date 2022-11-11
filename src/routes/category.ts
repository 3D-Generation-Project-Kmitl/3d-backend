import { categoryController } from '../controllers';
import { verifyToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { CreateCategoryRequestDTO, UpdateCategoryRequestDTO } from '../dtos/category';
import { Router } from 'express';

const router = Router();

router.get('/all', categoryController.getCategories);
router.post('/', [verifyToken, validateRequest(CreateCategoryRequestDTO)], categoryController.create);
router.put('/:id', [verifyToken, validateRequest(UpdateCategoryRequestDTO)], categoryController.update);
router.delete('/:id', [verifyToken], categoryController.remove);

export default router;