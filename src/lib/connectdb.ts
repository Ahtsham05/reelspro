import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let cashed = global.mongoose;

if(!cashed){
    cashed = global.mongoose = {
        conn : null,
        promise : null
    }
}

export async function connectdb(){
    if(cashed.conn){
        return cashed.conn;
    }

    if(cashed.promise){
        try {
            cashed.conn = await cashed.promise;
        } catch (error) {
            cashed.promise = null;
            throw error;
        }
        return cashed.conn;
    }

    const options = {
        maxPoolSize : 10,
        bufferCommands : true,
    }
    cashed.promise = mongoose.connect(MONGODB_URI, options).then(()=>{
        return mongoose.connection
    })
}