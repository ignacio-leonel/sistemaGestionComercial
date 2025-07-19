const express = require('express');
const app = express();
const productosRoutes = require('./routes/productos.routes');

app.use(express.json());
app.use('/productos', productosRoutes); // monta las rutas bajo /productos

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
