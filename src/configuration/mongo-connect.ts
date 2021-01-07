import mongoose from "mongoose";

export function connectToDb(DB_URL: string) {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((e) => console.log("MongoDB Failed to connect"));
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error: "));
}
