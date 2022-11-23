const Servicio = require('../models/ServicioModel');
const {
    getTotalRegisters, 
    getErrorObject, 
    getErrorMessage, 
    checkValidValues
} = require('../helpers/helpers');

// Leer todos los servicios
const leerServicios = async (req, res, next) => {
    const pageLinksNum = 4;
    const rowsPerPage = 5;
    const page = req.params.page || 1;
    const totalRegisters = await getTotalRegisters(Servicio);

    Servicio
        .find({})
        .skip((rowsPerPage * page) - rowsPerPage)
        .limit(rowsPerPage)
        .exec((err, servicios) => {
            Servicio.count().exec((err, count) => {
                if (err) return next(err)
                res.render('back/servicios', {
                    servicios: servicios,
                    pageLinksNum: pageLinksNum, 
                    total: totalRegisters, 
                    current: page,
                    pages: Math.ceil(count / rowsPerPage)
                })
            })
        });
};

// Vista formulario crear nuevo
const vistaCrearServicio = (req, res) => {
    res.render('back/nuevoServicio', getErrorMessage(null)); 
};

// Crear nuevo
const nuevoServicio = (req, res) => {
    const formIsValid = checkValidValues(Object.values(req.body));
    if (formIsValid) {
        const { nombre, comentario } = req.body;
        const servicio = new Servicio(({
            nombre,
            comentario
        }));
    
        servicio.save((error,servicio) => {
            if(error) {
                const errorObject = getErrorObject('Error al crear el servicio');
                return res.json(errorObject);
            };
            res.redirect('/servicios/1');
        });
    } else {
        const errorText = 'Comprueba los valores de los campos.';
        res.render('back/nuevoServicio', getErrorMessage(errorText)); 
    }
};

// Vista formulario editar
const vistaEditarServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) {
            throw new Error('Servicio not found');
        } else {
            res.render('back/editarServicio',{
                servicio, 
                error: null
            });
        }
    } catch (error) {
        console.log('Error al leer el servicio: ', error);
        const errorObject = getErrorObject('Error al leer el servicio');
        return res.json(errorObject);
    };
};

// Editar servicio
const editarServicio = async (req, res) => {
    const formIsValid = checkValidValues(Object.values(req.body));
    if (formIsValid) {
        try {
            const { serviceId, nombre, comentario } = req.body;
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    nombre: nombre, 
                    comentario: comentario
                }
            };
            await Servicio.findByIdAndUpdate(serviceId, updateDoc, options);
            res.redirect('/servicios/1');
        } catch (error) {
            console.log('Error al editar el servicio: ', error);
            const errorObject = getErrorObject('Error al editar el servicio');
            return res.json(errorObject);
        };
    } else {
        const errorText = 'Los valores de los campos no pueden estar vacíos, se han restaurado sus valores originales.';
        const servicio = await Servicio.findById(req.body.serviceId);
        res.render('back/editarServicio',{
            servicio, 
            error: errorText
        });
    }
};

// Eliminar servicio
const eliminarServicio = async (req, res) => {
    try {
        const result = await Servicio.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.redirect('/servicios/1');
        } else {
            console.log('No documents matched the query. Deleted 0 documents.');
        };
    } catch (error) {
        console.log('Error al eliminar el servicio: ', error);
        const errorObject = getErrorObject('Error al eliminar el servicio');
        return res.json(errorObject);
    };
};

// Leer un servicio
const leerUnServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) {
            throw new Error('Servicio not found');
        } else {
            res.render('back/servicio', {
                servicio
            });
        }
    } catch (error) {
        console.log('Error al leer el servicio: ', error);
        const errorObject = getErrorObject('Error al leer el servicio');
        return res.json(errorObject);
    };
};

module.exports={
    leerServicios, 
    leerUnServicio, 
    eliminarServicio, 
    vistaCrearServicio, 
    nuevoServicio, 
    vistaEditarServicio, 
    editarServicio
};