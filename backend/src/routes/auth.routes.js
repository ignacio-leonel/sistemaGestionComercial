import express from 'express';
import { loginUsuario, registerUsuario } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUsuario);
router.post('/register', registerUsuario);

export default router;