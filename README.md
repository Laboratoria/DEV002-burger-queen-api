# Burger Queen API

La API burger queen está diseñada para el manejo de administradores, chef, meseros, productos y órdenes de un restaurante.

_______________

## Prueba sin instalación local de la aplicación

### Instalar [Postman](https://www.postman.com/downloads/)

### Utiliza las rutas indicadas más abajo colocando antes:

```bash
  https://leburgerqueenrestaurant.onrender.com
```

_______________

## Instalación

Para la instación sigue los siguientes pasos:

```bash
  $ git clone https://github.com/filletournesols/Burger-queen-api.git
```

```bash
  $ npm install
```

### Instalar [postgreSQL](https://www.postgresql.org).

```bash
  $ cd db_data.sql
```

```bash
  $ psql postgres://postgres:123456@127.0.0.1:5432/dummy?ssl=true -f db.sql
```

### Configurar variables de entorno:

```bash
  JWT_SECRET=clave para Json Web Token
  DB_URL="connection string"
  PORT=3000
```

### Instalar [Postman](https://www.postman.com/downloads/) para probar las rutas.

_______________


## Referencias

#### Ingresar a la aplicación

```http
  POST /auth
```

| Tipo     | Descripción                |
| :------- | :------------------------- |
| `string` | **Required**. username y contraseña |

#### Usuarios
#### Obtener la lista de usuarios

```http
  GET /users
```

| Tipo     | Descripción                |
| :------- | :------------------------- |
| `string` | **Required**. Admin |

#### Obtener la información de un usuario por su email

```http
  GET /users/email/:email
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `email` |`string` | **Required**. Admin |

#### Obtener la información de un usuario por su ID

```http
  GET /users/:uid
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `UID` |`string` | **Required**. Admin |

#### Crear un nuevo usuario

```http
  POST /users
```

| Tipo     | Descripción                |
| :------- | :------------------------- |
| `string` | **Required**. Admin |

#### Actualizar un usuario por su email

```http
  PUT /users/email/:email
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `email` |`string` | **Required**. Admin |

#### Actualizar un usuario por su ID

```http
  PUT /users/:uid
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `UID` |`string` | **Required**. Admin |

#### Eliminar un usuario por su email

```http
  DELETE /users/email/:email
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `email` |`string` | **Required**. Admin |

#### Eliminar un usuario por su ID

```http
  DELETE /users/:uid
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `UID` |`string` | **Required**. Admin |

#### Órdenes
#### Obtener la lista de órdenes

```http
  GET /orders
```

| Tipo     | Descripción                |
| :------- | :------------------------- |
| `string` | **Required**. Admin, Chef o Waiter |

#### Obtener la información de una orden

```http
  GET /orders/product/details
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `orderID` |`string` | **Required**. Admin, Chef o Waiter |

#### Crear una orden

```http
  POST /orders
```

| Tipo     | Descripción                |
| :------- | :------------------------- |
| `string` | **Required**. Admin, Chef o Waiter |

#### Crear un la información de cantidad de un producto

```http
  POST /orders/product
```

| Tipo     | Descripción                |
| :------- | :------------------------- |
| `string` | **Required**. Admin, Chef o Waiter y nombre del producto |

#### Actualizar la información de una orden por su ID

```http
  PUT /orders/:orderId
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `orderID` |`string` | **Required**. Admin, Chef o Waiter |

#### Eliminar una orden por su ID

```http
  DELETE /orders/:orderId
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `orderID` |`string` | **Required**. Admin, Chef o Waiter  |

#### Productos
#### Obtener la lista de productos

```http
  GET /products
```

| Tipo     | Descripción                |
| :------- | :------------------------- |
| `string` | **Required**. Admin, Chef o Waiter |

#### Obtener la información de un producto

```http
  GET /products/:productId
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `productID` |`string` | **Required**. Admin, Chef o Waiter |

#### Crear un producto

```http
  POST /products
```

| Tipo     | Descripción                |
| :------- | :------------------------- |
| `string` | **Required**. Admin |

#### Actualizar la información de un producto

```http
  PUT /products/:productId
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `productID` |`string` | **Required**. Admin |

#### Eliminar un producto por su ID

```http
  DELETE /products/:productId
```

| Parámetro | Tipo     | Descripción                |
| :------- |:------- | :------------------------- |
| `productID` |`string` | **Required**. Admin |

## Autora

- [@filletournesols](https://github.com/filletournesols)