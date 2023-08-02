const mongoose = require('mongoose');

async function connectToDatabase(){
    const connectionString = process.env.DB;
    try {
        await mongoose.connect(connectionString);
        console.log("Connected with Database");
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {connectToDatabase}