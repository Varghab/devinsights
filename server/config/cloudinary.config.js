const cloudinary = require('cloudinary');

const connectToCloud = () => {
    cloudinary.v2.config({
        cloud_name: 'dadvr5lma', 
        api_key: '919264274676234', 
        api_secret: 'DzKGdC2rjCl6kbaoVXMYGMgzOoY'
    })
    console.log("Connected to cloudinary");
}


module.exports = { connectToCloud }