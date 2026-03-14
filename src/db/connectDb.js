import mongoose from "mongoose";
import { DbName } from "../constants.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DbName}`
        );

        console.log(
            "Connected to the mongoDb database successfully",
            connectionInstance.connection.host
        );
    } catch (err) {
        console.error("Error connecting to the mongoDB databse", err.message);
    }
};

export { connectDb };
