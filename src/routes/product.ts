import { productController } from '../controllers';
import { verifyToken, permit } from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.get('/admin', [verifyToken, permit("ADMIN")], productController.adminGetProducts);
router.patch('/admin', [verifyToken, permit("ADMIN")], productController.adminUpdateStatusProduct);
router.get('/count', [verifyToken, permit("ADMIN")], productController.countProducts);
router.get('/all', productController.getProducts);
router.get('/myProducts', [verifyToken], productController.getMyProducts);
router.get('/store/:storeId', productController.getProductsByStoreId);
router.get('/search', productController.searchProduct);
router.get('/:id', productController.getProduct);
router.post('/', [verifyToken], productController.create);
router.put('/:id', [verifyToken], productController.update);
router.delete('/:id', [verifyToken], productController.remove);

export default router;