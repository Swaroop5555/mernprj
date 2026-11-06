const mongoose= require("mongoose");

const connectDb= async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
            console.log("mongodb connection success");
        
    }
    catch(error)
    {
        console.log("db connection error");
        console.log(error.message);
        process.exit(1);
    }
};
 
module.exports= connectDb;