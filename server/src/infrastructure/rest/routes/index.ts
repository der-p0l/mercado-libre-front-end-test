import { Router } from 'express';

const router = Router();

// TODO: add authentication

// Define namespaces
router.use('/items', require('./ItemsRouter'));

export = router;
