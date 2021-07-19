//los middlewares en express son solo simple funciones
const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    //lo pido en los x-token en los headers
    const token= req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'NO hay token en la peticion'
        });
    }

    try {
        
        //aqui capturo el todo el payload  uid: name, fecha inicio y fecha fin del  token
        const {uid,name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
         
        req.uid=uid;
        req.name=name;

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        });
        
    }

    next();

}

module.exports ={
    validarJWT
}