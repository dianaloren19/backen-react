const {response} = require('express');
const { replaceOne } = require('../models/Evento');
const Evento = require('../models/Evento');



const getEventos = async(req, res=response)=>{

    //Listar todos los eventos
    const eventos = await Evento.find()
    //para rellenar los datos del usuario se usa e metodo populate()
                                .populate('user','name');

    res.json({
        
            ok: true,
            eventos
    })
}



const crearEvento = async(req, res=response)=>{

  
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
       const eventoGuardado = await evento.save();
       res.json({
            ok: true,
            evento:eventoGuardado
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
    });
    }
        
}


const actualizarEvento =  async(req, res=response)=>{

    const eventoId = req.params.id; 
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe con ese id'                    
            });
        }

        //en el evento viene un id de usuario y el uid  es el que se crea al crear el usuario
        if(evento.user.toString() !== uid){
             return res.status(401).json({
                ok:false,
                msg:' no esta autorizado a modificar'
            });
        }

        const nuevoEvento ={
            ...req.body,
            user:uid
        }


        //new true es para que retorne lso datos actualizados de a BD
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true});
        res.json({
            ok:true,
            evento:eventoActualizado
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
        
    }  
}


const eliminarEvento = async(req, res=response)=>{

    const eventoId = req.params.id; 
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe con ese id'                    
            });
        }

        //en el evento viene un id de usuario y el uid  es el que se crea al crear el usuario
        if(evento.user.toString() !== uid){
             return res.status(401).json({
                ok:false,
                msg:'No tiene provilegios para eliminar evento'
            });
        }

        
         await Evento.findByIdAndDelete(eventoId);
        res.json({
            ok:true
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
        
    }  

    
}

module.exports ={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}