// db.js
import mongoose from 'mongoose';

const conn = () => {
  mongoose.connect(process.env.MONGODB_URI, {
   // dbName: 'diarydear',
   // useNewUrlParser: true,
   // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the db successfully");
  })
  .catch((err) => {
    console.log(`db connection error: ${err}`);
  });
};

export default conn;  // Burada default export kullanıyoruz

