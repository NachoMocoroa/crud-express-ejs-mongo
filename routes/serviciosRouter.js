const express=require('express');
const router=express.Router();
const {
    leerServicios, 
    vistaCrearServicio, 
    nuevoServicio, 
    vistaEditarServicio, 
    editarServicio, 
    eliminarServicio, 
    leerUnServicio 
} = require('../controllers/serviciosController');

// Vista formulario crear nuevo
router.get('/nuevo', vistaCrearServicio);

// Leer todos los servicios
router.get('/:page', leerServicios);

// Crear nuevo
router.post('/nuevo', nuevoServicio);

// Vista formulario editar
router.get('/editar/:id', vistaEditarServicio);

// Editar servicio
router.post('/editar', editarServicio);

// Eliminar servicio
router.get('/eliminar/:id', eliminarServicio);

// Leer un servicio
router.get('/ver/:id', leerUnServicio);

module.exports=router;
