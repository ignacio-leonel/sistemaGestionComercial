const express = require('express');
const router = express.Router();
const { obtenerProductos, buscarProducto } = require('../controllers/productos.controller');
const { agregarProducto } = require('../controllers/productos.controller')

router.get('/', obtenerProductos);
router.get('/buscar', buscarProducto);

router.post('/', agregarProducto);

module.exports = router;
