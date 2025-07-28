import Producto from '../models/producto.model.js';
import  Op  from 'sequelize';

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Buscar productos con filtros (id, nombre, codigo)
const buscarProducto = async (req, res) => {
  const { id, nombre, codigo } = req.query;
  try {
    // Armar condiciones dinámicas
    const where = {};
    if (id) where.id = id;
    if (nombre) where.nombre = { [Op.iLike]: `%${nombre}%` };
    if (codigo) where.codigo = { [Op.iLike]: `${codigo}%` };

    const productos = await Producto.findAll({ where });

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron productos' });
    }

    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }  // ...existing code...
  // Elimina estas líneas:
  await db.authenticate();
  console.log('Conexión a la base exitosa');
  // ...existing code...  // ...existing code...
  // Elimina estas líneas:
  await db.authenticate();
  console.log('Conexión a la base exitosa');
  // ...existing code...
};

// Agregar producto
const agregarProducto = async (req, res) => {
  const productoNuevo = req.body;
  

  try {
    const productoAgregado = await Producto.create(productoNuevo);
    res.status(201).json({ mensaje: 'Producto agregado', producto: productoAgregado });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Editar producto
const editarProducto = async (req, res) => {
  const id = req.params.id;
  const datos = req.body;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    await producto.update(datos);
    res.json({ mensaje: 'Producto actualizado', producto });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export {
  obtenerProductos,
  buscarProducto,
  agregarProducto,
  editarProducto,
  eliminarProducto,
};
