import { Router } from 'express';
import itemsController from '../controllers/ItemsController';

const router = Router();

// Define routes
router.get('/', itemsController.list);
router.get('/:id', itemsController.show);

export = router;
