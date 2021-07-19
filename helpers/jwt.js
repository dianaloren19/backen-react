const jwt = require('jsonwebtoken');

//aqui se contruye el JSONWEBTOKEN
//JWT contiene un payload, la palabra secreta(esta esta creaca en env), y una firma, tendra una dureccion de 2 horas
const generarJWT =(uid,name)=>{

    return new Promise((resolve,reject)=>{
        const payload ={uid,name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        //este colva se dispara con un error en caso que no se pueda firmar por error y tambien Dispara el token    
        }, (err,token)=>{

            if(err){
                console.log(err);
                reject('no se pudo generar el token');
            }
            resolve(token);

        })
    })

}

module.exports = {
    generarJWT
}