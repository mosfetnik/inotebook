
const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/crudOperation";


const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(() => console.log("Connected with Server Succesfully :"))
    .catch((err) => { console.log(err); });


}

module.exports = connectToMongo;







