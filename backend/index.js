const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))

// Ajustes
app.set('port',3001);

// Middlewares
app.use(express.json());

// Routes//
app.use('/api',routes);

// Ajustes del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});