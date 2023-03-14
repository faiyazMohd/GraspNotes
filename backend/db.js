const mongoose = require('mongoose');
// const mongoURI  ="mongodb://localhost:27017/?directConnection=true"
const mongoURI  ="mongodb://127.0.0.1:27017/graspnotes?directConnection=true"
mongoose.set("strictQuery", false);

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connection to Mongo was Successfull");
    })

}

module.exports = connectToMongo;