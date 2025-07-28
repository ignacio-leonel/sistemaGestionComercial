import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sistema_gestion', 'postgres', '050216', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
