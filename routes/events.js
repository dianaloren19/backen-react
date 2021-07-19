/* eventos routes   api/events*/
const { Router } = require("express");
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const {getEventos,crearEvento,actualizarEvento,eliminarEvento}= require('../controllers/events');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require("../helpers/isDate");



//para que se aplique el middlewares en todas las ruras, es decir todos estos eventos se validaran con el token
//Cualquier peticion que este debajo de sto va ha tener que tener su token
router.use(validarJWT);


//todos tienen que pasar por la validacion de JSON WEB token  JWT
//obtener eventos
router.get('/',getEventos)

//Crear eventos
router.post(
    '/',
    [
        //para que funcione se debe importar validar campo ya que ahi estan las validaciones
        check('title','El titulo es obligatorio').not().isEmpty(),
        //para validar el campo estar secrea en los helper un custon date, se valida en (isDate) en helpder
        check('start','la fecha de inicio es obligatoria').custom(isDate),
        check('end','la fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento)


//Actualizar eventos
router.put('/:id',actualizarEvento)


//Borrar eventos
router.delete('/:id',eliminarEvento)

module.exports = router;