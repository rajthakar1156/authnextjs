import { error } from "console";
import mongoose from "mongoose";    

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!) // bcz i'm sure that mongo_uri is not undefined 
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("mongodb connected!");
        })

        connection.on('error',()=>{
            console.log("mongodb connection error , please check db is up and running",error);
            process.exit();
        })
    } catch (error) {
        console.log("mongodb connection error!",error);
    }
}