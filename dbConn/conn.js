const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const dbConnection =()=>{
  mongoose.connect(process.env.CONNECTION_URL, { 
  useUnifiedTopology: true,
  useNewUrlParser: true 
})

.then(console.log("Connected To MongoDb"))
.catch((err) =>console.log(err))
}


module.exports = dbConnection