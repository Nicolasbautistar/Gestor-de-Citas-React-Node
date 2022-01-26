const mongoose = require('mongoose');

const dbConnection = async () =>{
    
    try {
        await mongoose.connect(process.env.Dd_Connection);
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar BD');
    }
};

module.exports = {
    dbConnection
}