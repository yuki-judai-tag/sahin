import moongose from "mongoose";


export const connectionDB = async ()=> {

    try {
        const conn =await moongose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error) {
     console.error(`error: ${error.message}`);
     process.exit(1);
    }
};