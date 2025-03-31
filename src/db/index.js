import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
      {
        writeConcern: { w: "majority" }
      }
    );
    console.log(
      "\n MongoDB connected succesfully! \n DB HOST: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MONGODB connection unsuccessfull!", error);
    process.exit(1);
  }
};

export default connectDb;
