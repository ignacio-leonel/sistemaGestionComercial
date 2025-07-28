import express from 'express';
import {
  obtenerProductos,
  buscarProducto,
  agregarProducto,
  editarProducto,
  eliminarProducto
} from '../controllers/productos.controller.js';


const router = express.Router();

router.get('/', obtenerProductos);
router.get('/buscar', buscarProducto);
router.post('/', agregarProducto);
router.put('/:id', editarProducto);
router.delete('/:id', eliminarProducto);

export default router;
