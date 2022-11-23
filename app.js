const express = require('express');
const bp = require('body-parser');
require('dotenv').config();
const { DBConnection } = require('./database/config');

/* CONFIGURAR EXPRESS */
const app = express();
const port = process.env.PORT || 3000;

/* CONECTAR BBDD */
DBConnection();

/* PARSEO DE REQ.BODY */
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

/* CONFIGURAR CARPETA ESTÁTICA */
app.use(express.static(__dirname + '/public'));

/* CONFIGURAR TEMPLATE ENGINES */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/* CONFIGURAR RUTAS */
app.use('/', require('./routes/indexRouter'));
app.use('/servicios', require('./routes/serviciosRouter'));
app.use('/productos', require('./routes/productosRouter'));

app.use((req, res) => {
    //console.log(' - req: ', req);
    res.status(404).render('back/404', {
        error: 404, 
        msg: 'Página no encontrada'
    });
});

/* PONER APLICACIÓN A LA ESCUCHA EN EL PUERTO */
app.listen(port, () => {
    console.log(`Servidor desde puerto ${port}`);
});