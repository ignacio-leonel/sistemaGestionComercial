const productos = [
  { id: 1, nombre: 'Yerba', codigo: '123456789' },
  { id: 2, nombre: 'Café', codigo: '987654321' }
];

//Logica para obtener productos y buscar por id, nombre o codigo

const buscarProducto = (req, res) => {
  const { id, nombre, codigo } = req.query;

  let resultados = productos;

  if (id) {
    resultados = resultados.filter(p => p.id.toString().startsWith(id));
  }
  if (nombre) {
    resultados = resultados.filter(p =>
      p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }
  if (codigo) {
    resultados = resultados.filter(p => p.codigo.startsWith(codigo));
  }

  if (resultados.length === 0) {
    return res.status(404).json({ mensaje: 'No se encontraron productos' });
  }

  res.json(resultados);
};


//Agregar un producto

const agregarProducto = (req, res) => {
  const { id, nombre, codigo } = req.body;

  if (!id || !nombre || !codigo) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  // Validar que no exista un producto con mismo id o código
  const existe = productos.some(p => p.id === id || p.codigo === codigo);
  if (existe) {
    return res.status(409).json({ mensaje: 'Producto ya existe' });
  }

  productos.push({ id, nombre, codigo });
  res.status(201).json({ mensaje: 'Producto agregado', producto: { id, nombre, codigo } });
};

//editar producto
const editarProducto = (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, codigo } = req.body;

  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  if (nombre) producto.nombre = nombre;
  if (codigo) producto.codigo = codigo;

  res.json({ mensaje: 'Producto actualizado', producto });
};

//ELIMINAR producto
const eliminarProducto = (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  productos.splice(index, 1);
  res.json({ mensaje: 'Producto eliminado' });
};
// Obtener todos los productos
const obtenerProductos = (req, res) => {
  res.json(productos);
};



module.exports = {
  obtenerProductos,
  buscarProducto,
  agregarProducto,
  editarProducto,
  eliminarProducto
};
