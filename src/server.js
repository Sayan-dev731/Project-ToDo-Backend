import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import app from "./app.js";
import { connectDb } from "./db/connectDb.js";

const PORT = process.env.PORT || 3000;

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on the port", PORT);
        })
    })
