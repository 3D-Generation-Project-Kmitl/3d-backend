import { productController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { CreateProductRequestDTO, UpdateProductRequestDTO } from '../dtos/product';
import { Router } from 'express';

const router = Router();

router.get('/all', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', [verifyToken, validateRequest(CreateProductRequestDTO)], productController.create);
router.put('/:id', [verifyToken, validateRequest(UpdateProductRequestDTO)], productController.update);
router.delete('/:id', [verifyToken], productController.remove);

export default router;