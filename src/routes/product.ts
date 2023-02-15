import { productController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { CreateProductRequestDTO, UpdateProductRequestDTO } from '../dtos/product';
import { Router } from 'express';

const router = Router();

router.get('/all', productController.getProducts);
router.get('/myProducts', [verifyToken], productController.getMyProducts);
router.get('/store/:storeId', productController.getProductsByStoreId);
router.get('/search', productController.searchProduct);
router.get('/:id', productController.getProduct);
router.post('/', [verifyToken], productController.create);
router.put('/:id', [verifyToken], productController.update);
router.delete('/:id', [verifyToken], productController.remove);

export default router;