const {Schema,model} = require('mongoose');

const EventoSchema = Schema({
    title:{
        type:String,
        required:true
    },

    notas:{
        type:String,
    },

    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
    
});

//Aqui es para extraer  y modificar el _id  y la version  y guaradar en el objet el resto
EventoSchema.method('toJSON',function(){
    const {__v, _id, ...object } = this.toObject(); 
    object.id=_id;
    return object;
});

module.exports = model('Evento',EventoSchema);