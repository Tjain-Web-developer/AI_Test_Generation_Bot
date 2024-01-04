import mongoose from "mongoose";

const connectToDatabase = () => {
    mongoose.connect("mongodb://localhost/pdfEmbed");

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Mongoose Connection Error, "));

    db.once("open", () => {
        console.info("Connection to the Database Established");
    });

    return db;
};

export default connectToDatabase;
