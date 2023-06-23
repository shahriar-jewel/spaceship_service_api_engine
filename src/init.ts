
import mongoose from "mongoose";
import bluebird from "bluebird";
import { exit } from "process";

export function mongoInit(url: string): void {
    // Connect to MongoDB
    mongoose.Promise = bluebird;
    mongoose.set("useFindAndModify", false);
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
        () => {
            console.log("Connected to mongodb");
        },
    ).catch(err => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        exit();
    });
}