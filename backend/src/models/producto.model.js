import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Producto = db.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cantidadEnStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING(13),
    allowNull: false,
  },
}, {
  tableName: 'productos',
  timestamps: false,
});

export default Producto;
