const express = require('express');
const cors = require("cors");

const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');
const pg = require("pg");
/*
const http = require('http')
para ver los métodos http que se pueden usar:
console.log(http.METHODS) 
para ver los status
console.log(http.STATUS_CODES) 
*/

const { port, dbUrl, secret } = config;
const app = express();

// configuración cors
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)
const pgClient = new pg.Client({ connectionString: config.dbUrl });

// pgClient.connect();
// pgClient.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pgClient.end();
// });

app.set('config', config);
app.set('pkg', pkg);

/* .urlencoded cuando es { extended: true } permite ingresar a información de los formularios,
cuando es { extended: false } es lo contrario */
/* .json() funciona muy similar a lo de .urlencoded pero con json */
/* .use() acepta una función con 3 parámetros -req, res, next-
por lo que no es encesario colocarle () a la función que cumple con esos parámetros*/
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(authMiddleware(secret));
app.use(express.json())
app.use(cors(corsOptions))

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});

module.exports = { app };