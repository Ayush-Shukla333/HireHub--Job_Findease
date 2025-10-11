import mongoose from 'mongoose';

//Function to connect to the mongodb database
const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/HireHub`);
  mongoose.connection.on("connected", () => console.log('Database connected'));
}

export default connectDB