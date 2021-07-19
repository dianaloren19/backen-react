
//validar los campos de los formularios
const {response} = require('express');
const {validationResult} = require('express-validator');

//el next hace que  pasen los siguientes check(middleware)
const validarCampos = (req, res=response, next) => {

    //manejo de errores
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    next(); 
}

module.exports ={
    validarCampos
}