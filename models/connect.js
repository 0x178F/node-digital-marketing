import mongoose from "mongoose";
import env from "dotenv";

const config = env.config();

//Database Connect
export default mongoose.connect(process.env.DATABASE, { autoIndex: true });

export const conn = mongoose.connection;
