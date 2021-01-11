import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((e) => console.log('MongoDB Failed to connect'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
