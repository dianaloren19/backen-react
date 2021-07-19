const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');






//crear un usuario en la BD
const crearUsuario = async(req, res = response) => {

    const {email,password} =req.body;

    try {
        let usuario= await Usuario.findOne({email});
        
        //validar que el usuario no exista en la BD
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'ya existe ese usuario'
            });
        }
        
        usuario= new Usuario(req.body);

        //Encriptar constraseña
        //las vueltas que da el salt para este caso 10
        const salt = bcrypt.genSaltSync();
        //encrypto contrasena
        usuario.password = bcrypt.hashSync(password,salt);


        await usuario.save();

        //AQUI se debe generar el JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
        ok:true,
        uid:usuario.id,
        name:usuario.name,
        token:token
    });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el administrador'
        });
        
    }

    
 }


 const loginUsuario = async(req, res = response) => {

    const {email,password} = req.body;

    try {

        const usuario= await Usuario.findOne({email});
        
        //validar que el usuario no exista en la BD
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'No existe un usuario con ese email'
            });
        }
        
        //confirmar  si el passwor es el mismo(validar password
        const validPassword= bcrypt.compareSync(password,usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'password incorrecto'
            });
        }
        
        //AQUI se debe generar el JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token:token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el administrador'
        });
    }

    
 }

 const revalidarToken = async(req, res = response) => {

   const {uid,name} = req;

    //Generar un nuevp JWT y retornarlo en la peticion
    const token = await generarJWT(uid, name);

    res.json({
         ok:true,
         token
     })
 }



 //se debe hacer este export para que se puedan usar en otros archivos
 module.exports = {
     crearUsuario,
     loginUsuario,
     revalidarToken
 }

 