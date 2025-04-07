const mongoose = require('mongoose');
const {MONGO_ATLAS, DB_NAME}= process.env;

const dbConnection= async() => {
  try {
    await mongoose.connect(MONGO_ATLAS+DB_NAME);
    console.log("[INFO] MONGODB is ONLINE!!!!!!");
    
  } catch (error) {
    console.log(error);
    throw new Error("[ERROR] Something went wrong!, check db connection with mongoDB");
    
  }
}

module.exports= {
    dbConnection,
}



//lGIsmUR75ue0jH2i