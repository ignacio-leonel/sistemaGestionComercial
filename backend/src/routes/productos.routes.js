const express = require('express');
const router = express.Router();
const {
  obtenerProductos,
  buscarProducto,
  agregarProducto,
  editarProducto,
  eliminarProducto
} = require('../controllers/productos.controller');

router.get('/', obtenerProductos);
router.get('/buscar', buscarProducto);
router.post('/', agregarProducto);
router.put('/:id', editarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;
