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
- ## Documentación de la API

### Rutas disponibles

| Método | Ruta                      | Descripción                          | Ejemplo de respuesta                    |
|--------|---------------------------|------------------------------------|----------------------------------------|
| GET    | `productos`           | Lista todos los productos           | `200 OK` con array JSON de productos   |
| POST   | `productos`           | Crea un nuevo producto              | `201 Created` con objeto producto      |
| GET    | `productos/:id`       | Obtiene un producto por ID          | `200 OK` con objeto producto            |
| PUT    | `productos/:id`       | Actualiza un producto existente     | `200 OK` con objeto producto actualizado|
| DELETE | `productos/:id`       | Elimina un producto (lógica)        | `204 No Content`                       |

---

### Ejemplo de respuesta exitosa (GET `/productos`)

```json
[
  {
    "id": 1,
    "nombre": "Producto A",
    "precio": 100,
    "stock": 50
  },
  {
    "id": 2,
    "nombre": "Producto B",
    "precio": 200,
    "stock": 30
  }
]
```
## Errores comunes

| Código HTTP | Error                  | Descripción                                    | Ejemplo de respuesta                          |
|-------------|------------------------|------------------------------------------------|-----------------------------------------------|
| 400 Bad Request  | Datos inválidos         | Cuando faltan campos obligatorios o son incorrectos | ```json { "error": "El campo 'nombre' es obligatorio" } ``` |
| 401 Unauthorized | No autorizado          | Cuando no se provee token válido o no hay permiso  | ```json { "error": "Acceso no autorizado" } ```               |
| 404 Not Found    | No encontrado           | Cuando el recurso solicitado no existe             | ```json { "error": "Producto no encontrado" } ```            |
| 500 Internal Server Error | Error interno        | Error inesperado en el servidor                      | ```json { "error": "Error interno, intente más tarde" } ```  |

---

### Ejemplo de error 400 - Datos inválidos

**Request Body:**

```json
{
  "precio": -10
}
```

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
cd backend/src
npm install
```
Frontend
```bash
cd ../../frontend
npm install
```
Configuración del entorno
Crear archivo .env con variables como:

```bash
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/mi_base_de_datos
```
## Ejecución

Backend
```bash
cd backend/src
npm start
```
Frontend
```bash
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
Este proyecto está bajo Licencia **MIT**  
Contactame si querés más detalles.

---

