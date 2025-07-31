import mongoose from "mongoose";

export default async function mongoConnect() {
  try {
    console.log("Trying to connect to MongoDB with:", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected ......");
  } catch (err) {
    console.log(`unable to connect to db: ${err}`);
  }
}
