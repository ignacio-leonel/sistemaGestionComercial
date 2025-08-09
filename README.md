# Sistema de Gestión Comercial

Sistema de gestión orientado a comercios. Permite que usuarios con roles **Administrador** o **Cajera** puedan gestionar productos, registrar ventas, controlar stock y generar tickets de venta.

## Características principales
- Altas, bajas y modificaciones de productos.
- Registro y seguimiento de ventas.
- Roles con permisos diferenciados.
- Generación automática de tickets.
- Interfaz web moderna con React.
- API REST construida con Node.js y Express.
- Persistencia de datos con PostgreSQL.

## Instalación

### Requisitos previos
- Node.js (vX.X.X) y npm o yarn
- PostgreSQL (vX.X)

### Clonar repositorio

```bash
git clone https://github.com/ignacio-leonel/sistemaGestionComercial.git
cd sistemaGestionComercial
```
Backend
```bash
Copiar
Editar
cd backend/src
npm install
```
Frontend
```bash
Copiar
Editar
cd ../../frontend
npm install
```
Configuración del entorno
Crear archivo .env con variables como:

```bash
Copiar
Editar
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/mi_base_de_datos
```
Ejecución

Backend
```bash
Copiar
Editar
cd backend/src
npm start
```
Frontend
```bash
Copiar
Editar
cd frontend
npm start
```

## Uso
- Acceder a [http://localhost:3000](http://localhost:3000) para iniciar sesión.
- Si sos **Administrador**, podés gestionar productos y ventas.
- Si sos **Cajera**, podés registrar ventas y generar tickets.

---

## Roles y permisos
- **Administrador**: acceso completo (productos, ventas, usuarios).
- **Cajera**: acceso limitado para registrar ventas y emitir tickets.

---

## Próximas funcionalidades
- 📊 Reportes de ventas (diarios, mensuales).
- 📦 Gestión de inventario con alertas de stock bajo.
- 🔐 Autenticación y autorización con JWT.
- 🗂 Historial de ventas y auditoría.

---

## Contribución
Las contribuciones son bienvenidas.  
Podés abrir un **issue** o un **pull request** para sugerir mejoras o nuevas funcionalidades.

---

## Licencia
Este proyecto está bajo Licencia **MIT** (o la que prefieras).  
Contactame si querés más detalles.

---

