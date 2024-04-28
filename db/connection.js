const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('Successflly connected to database.............');
  } catch (error) {
    console.log(error);
    console.log('Error in coneecting to the database..');
    process.exit(0);
  }
};

module.exports = connectDB;
