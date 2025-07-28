import express from 'express';
import { registrarVenta, listarVentas } from '../controllers/ventas.controller.js';
import { verificarToken, soloAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verificarToken, registrarVenta);
router.get('/', verificarToken, soloAdmin, listarVentas); // Solo admin ve todo

export default router;