const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Conectado ao mongoDB`);
  } catch (error) {
    console.log(`Erro ao se conectar, ${error}`);
    process.exit(1);
  }
};

module.exports = connectToDb;
