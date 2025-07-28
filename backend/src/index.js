import db from './config/db.js';
import express from 'express';
import router from './routes/auth.routes.js';
import productosRouter from './routes/productos.routes.js'; // <-- Agrega esta línea
import ventasRoutes from './routes/ventas.routes.js';


const app = express(); 

app.use(express.json());
app.use('/ventas', ventasRoutes);
app.use('/auth', router);
app.use('/productos', productosRouter); 

const PORT = 4005;

async function main() {
  try {
    await db.authenticate();
    console.log('Conexión a la base exitosa');

    await db.sync();

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base:', error);
  }
}

main();
