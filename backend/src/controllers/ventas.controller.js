import pool from '../config/db.js';

export const registrarVenta = async (req, res) => {
  const { id_producto, cantidad } = req.body;
  const id_usuario = req.usuario.id;

  try {
    // Verificar stock disponible
    const producto = await pool.query('SELECT stock FROM productos WHERE id = $1', [id_producto]);
    if (producto.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const stockActual = producto.rows[0].stock;
    if (stockActual < cantidad) {
      return res.status(400).json({ mensaje: 'Stock insuficiente' });
    }

    // Registrar la venta
    await pool.query(
      'INSERT INTO ventas (id_usuario, id_producto, cantidad) VALUES ($1, $2, $3)',
      [id_usuario, id_producto, cantidad]
    );

    // Actualizar stock
    await pool.query(
      'UPDATE productos SET stock = stock - $1 WHERE id = $2',
      [cantidad, id_producto]
    );

    res.json({ mensaje: 'Venta registrada y stock actualizado' });
  } catch (error) {
    console.error('Error al registrar venta', error);
    res.status(500).json({ mensaje: 'Error interno' });
  }
};
export const listarVentas = async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT v.id, v.fecha, u.nombre AS vendedor, p.nombre AS producto, v.cantidad
      FROM ventas v
      JOIN usuarios u ON v.id_usuario = u.id
      JOIN productos p ON v.id_producto = p.id
      ORDER BY v.fecha DESC
    `);

    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al listar ventas', error);
    res.status(500).json({ mensaje: 'Error interno' });
  }
};
