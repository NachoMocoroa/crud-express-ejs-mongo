const mongoose=require('mongoose');

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.URI_DB);
        console.log('conectado a la base de datos');
    } catch (error) {
        const errorText = 'Error al conectar con la base de datos';
        console.log(`${errorText}: ${error}`);
        return({
            ok: false,
            msg: errorText
        });
    };
};

module.exports={
    DBConnection
};