import express from 'express';
import homeRoutes from './homeRoutes.js'

const router = express.Router();

router.use('/', homeRoutes);
export default router;
