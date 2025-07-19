const productos = [
  { id: 1, nombre: 'Yerba', codigo: '123456789' },
  { id: 2, nombre: 'Café', codigo: '987654321' }
];

//Logica para obtener productos y buscar por id, nombre o codigo

const obtenerProductos = (req, res) => {
  res.send('Listado de productos desde el controller');
};

const buscarProducto = (req, res) => {
  const { id, nombre, codigo } = req.query;

  let resultados = [];

  if (id) {
    resultados = productos.filter(p => p.id.toString().startsWith(id));
  } else if (nombre) {
    resultados = productos.filter(p =>
      p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  } else if (codigo) {
    resultados = productos.filter(p => p.codigo.startsWith(codigo));
  } else {
    return res.status(400).json({ mensaje: 'Faltan parámetros de búsqueda' });
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



module.exports = {
  obtenerProductos,
  buscarProducto,
  agregarProducto
};
