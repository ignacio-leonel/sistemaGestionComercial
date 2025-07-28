import Producto from '../models/producto.model.js';

async function listarProductos() {
  return await Producto.findAll();
}

async function buscarProductoPorId(id) {
  return await Producto.findByPk(id);
}

async function agregarProducto(productoNuevo) {
  return await Producto.create(productoNuevo);
}

async function modificarProducto(id, datos) {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  await producto.update(datos);
  return producto;
}

async function eliminarProducto(id) {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  await producto.destroy();
}

export {
  listarProductos,
  buscarProductoPorId,
  agregarProducto,
  modificarProducto,
  eliminarProducto,
};
