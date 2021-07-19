const mongoose = require('mongoose');


//es una funcion asincrona necesita await
const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        });
        console.log('BD conectada');

    } catch (error) {
        console.log(error);
        throw new Error('Error iniciando BB');
        
    }
}

module.exports ={
    dbConnection
}